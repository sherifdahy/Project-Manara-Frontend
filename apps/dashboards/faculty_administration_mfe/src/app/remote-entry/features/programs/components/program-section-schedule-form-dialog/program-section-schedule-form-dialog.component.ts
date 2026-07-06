import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  DayResponse,
  DepartmentUserResponse,
  PaginatedList,
  PeriodResponse,
  RequestFilters,
} from '@project-manara-frontend/models';
import { DepartmentUserService } from '@project-manara-frontend/services';
import { SubjectResponse } from 'libs/models/src/lib/subjects/responses/subject-response';
import {
  debounceTime,
  distinctUntilChanged,
  finalize,
  Subject,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-program-section-schedule-form-dialog',
  standalone: false,
  templateUrl: './program-section-schedule-form-dialog.component.html',
  styleUrls: ['./program-section-schedule-form-dialog.component.css'],
})
export class ProgramSectionScheduleFormDialogComponent implements OnInit {
  form!: FormGroup;

  instructors: DepartmentUserResponse[] = [];
  loading = false;
  hasNextPage = true;
  requestFilters: RequestFilters = new RequestFilters();

  typeahead$ = new Subject<string>();

  constructor(
    private readonly matDialogRef: MatDialogRef<ProgramSectionScheduleFormDialogComponent>,
    private readonly formBuilder: FormBuilder,
    private readonly departmentUserService: DepartmentUserService,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'add' | 'edit';
      departmentId: number;
      subject: SubjectResponse;
      period: PeriodResponse;
      day: DayResponse;
    },
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instructorId: [null, [Validators.required]],
      maxSlots: [0, [Validators.required, Validators.min(1)]],
    });

    this.listenToSearch();

    // initial load
    this.load();
  }

  submit() {
    if (this.form.invalid) return;

    this.matDialogRef.close(this.form.value);
  }

  // ---------------- SEARCH ----------------
  listenToSearch() {
    this.typeahead$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((term) => {
          this.requestFilters.SearchValue = term;

          this.requestFilters.PageNumber = 1;
          this.instructors = [];

          this.load();
        }),
      )
      .subscribe();
  }

  // ---------------- LOAD MORE ----------------
  loadMore() {
    if (!this.hasNextPage) return;

    this.requestFilters.PageNumber++;

    this.load();
  }

  // ---------------- API CALL ----------------
  load() {
    this.loading = true;

    this.departmentUserService
      .getInstructors(this.data.departmentId, this.requestFilters)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe((response: any) => {
        this.hasNextPage = response.hasNextPage;

        this.instructors = [...this.instructors, ...(response.items ?? [])];
      });
  }
}
