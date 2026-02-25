import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  DepartmentService,
  HttpErrorService,
  ToastService,
} from '@project-manara-frontend/services';
import { DepartmentRequest } from 'libs/models/src/lib/departments/requests/department-request';

@Component({
  selector: 'app-department-settings-page',
  standalone: false,
  templateUrl: './department-settings-page.component.html',
  styleUrls: ['./department-settings-page.component.css'],
})
export class DepartmentSettingsPageComponent implements OnInit {
  departmentForm!: FormGroup;
  departmentId!: number;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private httpErrorService: HttpErrorService,
    private toastrService: ToastService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.departmentId = Number(this.route.parent?.snapshot.params['id']);
    this.loadDepartmentData();
  }

  initForm(): void {
    this.departmentForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      headOfDepartment: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  loadDepartmentData(): void {
    this.departmentService.get(this.departmentId).subscribe({
      next: (department) => {
        this.departmentForm.patchValue(department);
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      },
    });
  }

  onSave() {
    if (this.departmentForm.valid) {
      var request = this.departmentForm.value as DepartmentRequest;

      this.departmentService.update(this.departmentId, request).subscribe({
        next: () => {
          this.toastrService.success(
            'Department information updated successfully',
          );
          this.departmentForm.markAsPristine();
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
    }

    this.departmentForm.markAllAsTouched();
  }
}
