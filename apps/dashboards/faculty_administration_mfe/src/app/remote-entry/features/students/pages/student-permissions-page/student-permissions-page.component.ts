import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  BasePermissionService,
  Category,
  HttpErrorService,
  LoaderService,
  ParsedPermissions,
  PermissionService,
} from '@project-manara-frontend/services';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-student-permissions-page',
  standalone: false,
  templateUrl: './student-permissions-page.component.html',
  styleUrls: ['./student-permissions-page.component.css'],
})
export class StudentPermissionsPageComponent implements OnInit {
  data$!: Observable<ParsedPermissions>;
  programUserId: number;
  searchQuery = '';

  defaults: string[] = [];
  selected: string[] = [];
  original: string[] = [];
  categories: Category[] = [];

  constructor(
    private route: ActivatedRoute,
    private ps: PermissionService,
    public base: BasePermissionService,
    private httpErrorService: HttpErrorService,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
  ) {
    this.programUserId = Number(this.route.parent?.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.loaderService.loading();
    this.data$ = this.ps.getUserPermissions(this.programUserId).pipe(
      tap((parsed) => {
        this.defaults = parsed.defaults;
        this.selected = [...parsed.active];
        this.original = [...parsed.active];
        this.categories = parsed.categories;
      }),
      finalize(() => this.loaderService.hide()),
    );
  }

  get filteredCategories(): Category[] {
    return this.base.filterCategories(this.categories, this.searchQuery);
  }

  getVisiblePermissions(category: Category) {
    return this.base.getVisiblePermissions(category, this.searchQuery);
  }

  getSelectedCount(category: Category): number {
    return this.base.getSelectedCount(category, this.selected);
  }

  isSelected(key: string): boolean {
    return this.selected.includes(key);
  }

  toggle(key: string): void {
    this.selected = this.base.toggle(this.selected, key);
  }

  selectAll(): void {
    this.selected = this.base.selectAll(
      this.selected,
      this.categories,
      this.searchQuery,
    );
  }

  deselectAll(): void {
    this.selected = this.base.deselectAll(
      this.selected,
      this.categories,
      this.searchQuery,
    );
  }

  save(): void {
    this.ps
      .updateForUser(this.programUserId, this.defaults, this.selected)
      .subscribe({
        next: () => {
          this.original = [...this.selected];
          this.toastrService.success('Permissions updated successfully');
        },
        error: (error) => this.httpErrorService.handle(error),
      });
  }
}
