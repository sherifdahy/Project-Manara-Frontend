import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  HttpErrorService,
  PeriodsService,
} from '@project-manara-frontend/services';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, finalize, switchMap, take } from 'rxjs';
import { PeriodRequest } from '@project-manara-frontend/models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-period-edit-page',
  standalone: false,
  templateUrl: './period-edit-page.component.html',
  styleUrls: ['./period-edit-page.component.css'],
})
export class PeriodEditPageComponent implements OnInit {
  periodForm!: FormGroup;
  periodId!: number;
  oldStartTime = '';
  oldEndTime = '';
  isLoading = false;
  isSaving = false;

  facultyId$ = this.store.select(selectFacultyId);

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private periodService: PeriodsService,
    private httpErrorService: HttpErrorService,
    private toastrService: ToastrService,
  ) {
    this.periodId = Number(this.route.parent?.snapshot.paramMap.get('periodId'));
  }

  ngOnInit() {
    this.initForm();
    this.loadPeriodData();
  }

  initForm(): void {
    this.periodForm = this.fb.group(
      {
        startTime: ['', [Validators.required]],
        endTime: ['', [Validators.required]],
      },
      { validators: this.timeRangeValidator },
    );
  }

  private timeRangeValidator(group: AbstractControl): ValidationErrors | null {
    const start = group.get('startTime')?.value;
    const end = group.get('endTime')?.value;
    if (start && end && start >= end) {
      return { timeRange: true };
    }
    return null;
  }

  loadPeriodData(): void {
    this.isLoading = true;
    this.periodService
      .get(this.periodId)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: (period) => {
          this.oldStartTime = period.startTime;
          this.oldEndTime = period.endTime;
          this.periodForm.patchValue({
            startTime: period.startTime,
            endTime: period.endTime,
          });
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
  }

  onSave(): void {
    if (this.periodForm.invalid) {
      this.periodForm.markAllAsTouched();
      return;
    }

    const request = this.periodForm.value as PeriodRequest;
    this.isSaving = true;

    this.facultyId$
      .pipe(
        filter((facultyId): facultyId is number => !!facultyId),
        take(1),
        switchMap((facultyId) =>
          this.periodService.update(
            facultyId,
            this.oldStartTime,
            this.oldEndTime,
            request,
          ),
        ),
        finalize(() => (this.isSaving = false)),
      )
      .subscribe({
        next: () => {
          this.toastrService.success('Period information updated successfully');
          this.periodForm.markAsPristine();
          this.oldStartTime = request.startTime;
          this.oldEndTime = request.endTime;
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
  }
}
