import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  HttpErrorService,
  PeriodsService,
} from '@project-manara-frontend/services';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, switchMap, take } from 'rxjs';
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
  oldStartTime!: string;
  oldEndTime!: string;
  facultyId$ = this.store.select(selectFacultyId);
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store,
    private periodService: PeriodsService,
    private httpErrorService: HttpErrorService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.oldStartTime = this.route.parent?.snapshot.params['startTime'] || '';
    this.oldEndTime = this.route.parent?.snapshot.params['endTime'] || '';
    this.loadPeriodData();
  }

  initForm(): void {
    this.periodForm = this.fb.group({
      startTime: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
    });
  }
  loadPeriodData(): void {
    this.facultyId$
      .pipe(
        filter((facultyId) => !!facultyId),
        take(1),
        switchMap((facultyId) =>
          this.periodService.get(
            facultyId!,
            this.oldStartTime,
            this.oldEndTime,
          ),
        ),
      )
      .subscribe({
        next: (period) => {
          this.periodForm.patchValue({
            ...period,
            startTime: period.startTime,
            endTime: period.endTime,
          });
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
  }

  onSave() {
    if (this.periodForm.valid) {
      const request = this.periodForm.value as PeriodRequest;

      this.facultyId$
        .pipe(
          filter((facultyId) => !!facultyId),
          take(1),
          switchMap((facultyId) =>
            this.periodService.update(
              facultyId!,
              this.oldStartTime,
              this.oldEndTime,
              request,
            ),
          ),
        )
        .subscribe({
          next: () => {
            this.toastrService.success(
              'Period information updated successfully',
            );
            this.periodForm.markAsPristine();
          },
          error: (error) => {
            this.httpErrorService.handle(error);
          },
        });
    }
    this.periodForm.markAllAsTouched();
  }
}
