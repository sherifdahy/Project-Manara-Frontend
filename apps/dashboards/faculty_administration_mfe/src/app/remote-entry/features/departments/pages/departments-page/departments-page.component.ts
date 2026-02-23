import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, Observable, switchMap } from 'rxjs';
import { DepartmentResponse } from '@project-manara-frontend/models';
import {
  DepartmentService,
  HttpErrorService,
} from '@project-manara-frontend/services';
import { DepartmentFormDialogComponent } from '../../components/department-form-dialog/department-form-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-departments-page',
  standalone: false,
  templateUrl: './departments-page.component.html',
  styleUrls: ['./departments-page.component.css'],
})
export class DepartmentsPageComponent implements OnInit {
  includeDisabled: boolean = false;
  facultyId$ = this.store.select(selectFacultyId);
  departments$!: Observable<DepartmentResponse[]>;
  constructor(
    private store: Store,
    private departmentService: DepartmentService,
    private httpErrorService: HttpErrorService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.departments$ = this.facultyId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) =>
        this.departmentService.getAll(id, this.includeDisabled),
      ),
    );
  }

  onFilterChange() {
    this.loadDepartments();
  }

  onToggleStatus(id: number) {
    this.departmentService.toggleStatus(id).subscribe({
      next: () => {
        this.loadDepartments();
      },
      error: (errors) => {
        this.httpErrorService.handle(errors);
      },
    });
  }

  openDepartmentFormDialog() {
    this.matDialog
      .open(DepartmentFormDialogComponent, {
        width: '600px',
        maxWidth: '90vw',
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) this.loadDepartments();
      });
  }
}
