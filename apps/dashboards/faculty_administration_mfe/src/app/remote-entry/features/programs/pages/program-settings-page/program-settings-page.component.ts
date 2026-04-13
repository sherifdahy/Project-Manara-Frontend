import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProgramRequest } from '@project-manara-frontend/models';
import {
  HttpErrorService,
  LoaderService,
  ProgramService,
  ToastService,
} from '@project-manara-frontend/services';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-program-settings-page',
  standalone: false,
  templateUrl: './program-settings-page.component.html',
  styleUrls: ['./program-settings-page.component.css'],
})
export class ProgramSettingsPageComponent implements OnInit {
  programForm!: FormGroup;
  programId!: number;
  isLoading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private httpErrorService: HttpErrorService,
    private programService: ProgramService,
    private toastrService: ToastService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.programId = Number(this.route.parent?.snapshot.params['id']);
    this.loadProgramData();
  }

  initForm(): void {
    this.programForm = this.fb.group({
      name: ['', [Validators.required]],
      code: ['', [Validators.required]],
      description: ['', [Validators.required]],
      creditHours: ['', [Validators.required, Validators.min(1)]],
    });
  }

  loadProgramData(): void {
    this.loaderService.loading();
    this.programService
      .get(this.programId)
      .pipe(finalize(() => this.loaderService.hide()))
      .subscribe({
        next: (program) => {
          this.programForm.patchValue(program);
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
  }
  onSave() {
    this.programForm.markAllAsTouched();

    if (this.programForm.invalid) return;

    const request = this.programForm.value as ProgramRequest;

    this.isLoading = true;

    this.programService
      .update(this.programId, request)
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe({
        next: () => {
          this.toastrService.success(
            'Program information updated successfully',
          );
          this.programForm.markAsPristine();
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
  }
}
