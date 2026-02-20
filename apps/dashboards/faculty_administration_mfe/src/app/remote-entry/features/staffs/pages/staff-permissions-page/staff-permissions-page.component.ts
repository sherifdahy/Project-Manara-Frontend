import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  BasePermissionService,
  Category,
  HttpErrorService,
  ParsedPermissions,
  PermissionService,
} from "@project-manara-frontend/services";
import { ToastrService } from "ngx-toastr";
import { Observable, tap } from "rxjs";

@Component({
  selector: 'app-staff-permissions-page',
  standalone: false,
  templateUrl: './staff-permissions-page.component.html',
  styleUrls: ['./staff-permissions-page.component.css'],
})
export class StaffPermissionsPageComponent implements OnInit {
  data$!: Observable<ParsedPermissions>;
  facultyUserId: number;
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
    private toastrService : ToastrService,
  ) {
    this.facultyUserId = Number(
      this.route.parent?.snapshot.paramMap.get('id')
    );
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.data$ = this.ps.getUserPermissions(this.facultyUserId).pipe(
      tap((parsed) => {
        this.defaults = parsed.defaults;
        this.selected = [...parsed.active];
        this.original = [...parsed.active];
        this.categories = parsed.categories;
      })
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
      this.searchQuery
    );
  }

  deselectAll(): void {
    this.selected = this.base.deselectAll(
      this.selected,
      this.categories,
      this.searchQuery
    );
  }

  save(): void {
    this.ps
      .updateForUser(this.facultyUserId, this.defaults, this.selected)
      .subscribe({
        next: () => {
          this.original = [...this.selected];
          this.toastrService.success('Permissions updated successfully');
        },
        error: (error) => this.httpErrorService.handle(error),
      });
  }
}
