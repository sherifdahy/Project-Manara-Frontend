import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { DayResponse, PeriodResponse } from '@project-manara-frontend/models';
import { SubjectResponse } from 'libs/models/src/lib/subjects/responses/subject-response';
import {
  debounceTime,
  delay,
  distinctUntilChanged,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  selector: 'app-program-lecture-schedule-form-dialog',
  standalone: false,
  templateUrl: './program-lecture-schedule-form-dialog.component.html',
  styleUrls: ['./program-lecture-schedule-form-dialog.component.css'],
})
export class ProgramLectureScheduleFormDialogComponent implements OnInit {
  form!: FormGroup;

  instructors: { id: number; name: string }[] = [];
  loading = false;
  page = 1;
  pageSize = 10;
  searchTerm = '';
  typeahead$ = new Subject<string>();
  constructor(
    private readonly store: Store,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      mode: 'add' | 'edit';
      subject: SubjectResponse;
      period: PeriodResponse;
      day: DayResponse;
    },
    private readonly matDialogRef: MatDialogRef<ProgramLectureScheduleFormDialogComponent>,
    private readonly formBuilder: FormBuilder,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      instructor: [null, [Validators.required, Validators.min(1)]],
      maxSlots: [0],
    });

    this.listenToSearch();

    // initial load
    this.typeahead$.next('');
  }

  loadData() {
    if (this.data.mode === 'edit') {
    }
  }

  submit() {
    if (this.form.invalid) return;

    this.matDialogRef.close(this.form.value);
  }

  listenToSearch() {
    this.typeahead$
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((term) => {
          this.loading = true;

          this.searchTerm = term;

          // reset pagination
          this.page = 1;
          this.instructors = [];
        }),
        switchMap((term) => this.fakeApi(term, this.page)),
      )
      .subscribe((items) => {
        this.instructors = items;
        this.loading = false;
      });
  }

  loadMore() {
    this.page++;

    this.loading = true;

    this.fakeApi(this.searchTerm, this.page).subscribe((items) => {
      this.instructors = [...this.instructors, ...items];

      this.loading = false;
    });
  }

  fakeApi(search: string, page: number) {
    const allItems = Array.from({ length: 100 }).map((_, index) => ({
      id: index + 1,
      name: `Instructor ${index + 1}`,
    }));

    const filtered = allItems.filter((x) =>
      x.name.toLowerCase().includes(search.toLowerCase()),
    );

    const start = (page - 1) * this.pageSize;

    const result = filtered.slice(start, start + this.pageSize);

    return of(result).pipe(delay(500));
  }
}
