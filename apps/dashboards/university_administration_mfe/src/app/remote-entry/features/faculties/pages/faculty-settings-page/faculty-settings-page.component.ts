import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { FacultyRequest } from '@project-manara-frontend/models';
import {
  FacultyService,
  HttpErrorService,
  LoaderService,
  ToastService,
} from '@project-manara-frontend/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-faculty-settings',
  standalone: false,
  templateUrl: './faculty-settings-page.component.html',
  styleUrls: ['./faculty-settings-page.component.css'],
})
export class FacultySettingsPageComponent implements OnInit {
  facultyForm!: FormGroup;
  facultyId!: number;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private toastrService: ToastService,
    private httpErrorService: HttpErrorService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.facultyId = Number(this.route.parent?.snapshot.params['id']);
    this.loadFacultyData();
  }

  initForm(): void {
    this.facultyForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      website: [
        '',
        [
          Validators.required,
          Validators.pattern(RegexPatternConsts.WEB_SITE_URL_PATTERN),
        ],
      ],
    });
  }

  loadFacultyData(): void {
    this.loaderService.loading();
    this.facultyService.get(this.facultyId).subscribe({
      next: (faculty) => {
        this.loaderService.hide();
        this.facultyForm.patchValue(faculty);
      },
      error: (error) => {
        this.loaderService.hide();
        this.httpErrorService.handle(error);
      },
    });
  }

  onSave(): void {
    if (this.facultyForm.invalid) {
      this.facultyForm.markAllAsTouched();
      return;
    }

    const request = this.facultyForm.value as FacultyRequest;

    this.isLoading = true;

    this.facultyService
      .update(this.facultyId, request)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.toastrService.success(
            'Faculty information updated successfully',
          );
          this.facultyForm.markAsPristine();
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
  }
}
