import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { FacultyRoleResponse } from '@project-manara-frontend/models';
import {
  BasePermissionService,
  Category,
  HttpErrorService,
  PermissionService,
} from '@project-manara-frontend/services';
import { Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';

@Component({
  selector: 'app-role-form-page',
  standalone: false,
  templateUrl: './role-form-page.component.html',
  styleUrls: ['./role-form-page.component.css'],
})
export class RoleFormPageComponent implements OnInit {
  data$!: Observable<FacultyRoleResponse>;
  roleId: number;
  facultyId$ = this.store.select(selectFacultyId);
  searchQuery = '';

  defaults: string[] = [];
  selected: string[] = [];
  original: string[] = [];
  categories: Category[] = [];

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private ps: PermissionService,
    public base: BasePermissionService,
    private httpErrorService: HttpErrorService
  ) {
    this.roleId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.loadData();
  }

  private loadData(): void {
    this.data$ = this.facultyId$.pipe(
      filter((id) => !!id),
      switchMap((id) => this.ps.getFacultyRoleWithPermissions(id!, this.roleId)),
      tap(({ parsed }) => {
        this.defaults = parsed.defaults;
        this.selected = [...parsed.active];
        this.original = [...parsed.active];
        this.categories = parsed.categories;
      }),
      map(({ role }) => role)
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

  hasChanges(): boolean {
    return this.base.hasChanges(this.selected, this.original);
  }

  toggle(key: string): void {
    this.selected = this.base.toggle(this.selected, key);
  }

  selectAll(): void {
    this.selected = this.base.selectAll(this.selected, this.categories, this.searchQuery);
  }

  deselectAll(): void {
    this.selected = this.base.deselectAll(this.selected, this.categories, this.searchQuery);
  }

  save(): void {
    if (!this.hasChanges()) return;

    this.facultyId$.pipe(
      filter((id) => !!id),
      take(1),
      switchMap((id) =>
        this.ps.updateForFaculty(this.roleId, id!, this.defaults, this.selected)
      )
    ).subscribe({
      next: () => (this.original = [...this.selected]),
      error: (error) => this.httpErrorService.handle(error),
    });
  }
}
