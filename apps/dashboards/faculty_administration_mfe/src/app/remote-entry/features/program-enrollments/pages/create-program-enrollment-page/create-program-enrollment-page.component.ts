import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { filter, finalize, Observable, switchMap, take } from 'rxjs';
import {
  PaginatedList,
  ProgramEnrollmentRequest,
  ProgramUserRequest,
  ProgramUserResponse,
  RequestFilters,
  StudentResponse,
  TermResponse,
  YearResponse,
} from '@project-manara-frontend/models';
import {
  HttpErrorService,
  ProgramEnrollmentsService,
  ProgramUserService,
  YearsService,
} from '@project-manara-frontend/services';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-program-enrollment-page',
  standalone: false,
  templateUrl: './create-program-enrollment-page.component.html',
  styleUrls: ['./create-program-enrollment-page.component.css'],
})
export class CreateProgramEnrollmentPageComponent implements OnInit {
  enrollmentForm!: FormGroup;
  students$!: Observable<PaginatedList<ProgramUserResponse>>;
  facultyId$ = this.store.select(selectFacultyId);
  terms$!: Observable<TermResponse[]>;
  years$!: Observable<YearResponse[]>;
  filters = new RequestFilters();
  selectedStudents: ProgramUserResponse[] = [];
  pageSizeOptions: number[] = [5, 10, 25, 50];
  programId!: number;
  isLoading = false;

  constructor(
    private store: Store,
    private yearService: YearsService,
    private fb: FormBuilder,
    private programUserService: ProgramUserService,
    private programEnrollmentsService: ProgramEnrollmentsService,
    private route: ActivatedRoute,
    private httpErrorService: HttpErrorService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.programId = +this.route.parent?.parent?.snapshot.params['id'];

    this.initForm();
    this.loadTerms();
    this.loadYears();
    this.loadStudents();
  }
  initForm(): void {
    this.enrollmentForm = this.fb.group({
      termId: ['', [Validators.required]],
      yearId: ['', [Validators.required]],
    });
  }

  loadTerms() {
    this.terms$ = this.yearService.getAllTerms();
  }
  loadYears(): void {
    this.years$ = this.facultyId$.pipe(
      filter((id): id is number => !!id),
      switchMap((id) => this.yearService.getAll(id, false)),
    );
  }
  loadStudents() {
    this.students$ = this.facultyId$.pipe(
      filter((id) => !!id),
      take(1),
      switchMap((id) =>
        this.programUserService.getAllByFacultyId(id!, this.filters),
      ),
    );
  }

  onSearch(): void {
    this.filters.PageNumber = 1;
    this.loadStudents();
  }

  onStatusFilter(): void {
    this.filters.PageNumber = 1;
    this.loadStudents();
  }

  goToPage(page: number, totalPages: number): void {
    if (page < 1 || page > totalPages) return;
    this.filters.PageNumber = page;
    this.loadStudents();
  }

  onPageSizeChange(): void {
    this.filters.PageNumber = 1;
    this.loadStudents();
  }

  getPages(totalPages: number): number[] {
    const current = this.filters.PageNumber;
    const maxVisible = 5;

    let start = Math.max(1, current - Math.floor(maxVisible / 2));
    let end = start + maxVisible - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  getStartIndex(response: PaginatedList<ProgramUserResponse>): number {
    return (response.pageNumber - 1) * this.filters.PageSize + 1;
  }

  getEndIndex(response: PaginatedList<ProgramUserResponse>): number {
    return Math.min(
      response.pageNumber * this.filters.PageSize,
      response.totalCount,
    );
  }

  addSubject(request: ProgramUserResponse) {
    this.selectedStudents.push(request);
  }

  deleteSubject(id: number) {
    this.selectedStudents = this.selectedStudents.filter((s) => s.id !== id);
  }

  isSelected(id: number): boolean {
    return this.selectedStudents.some((s) => s.id === id);
  }

  onSubmit() {
    this.enrollmentForm.markAllAsTouched();
    if (this.enrollmentForm.invalid) return;
    const request: ProgramEnrollmentRequest = this.enrollmentForm.value;
    request.studentIds = this.selectedStudents.map((s) => s.id);
    this.isLoading = true;

    this.programEnrollmentsService
      .create(this.programId, request)
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe({
        next: () => {
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => {
          this.httpErrorService.handle(err);
        },
      });
  }
}

//The Error Does not appere
//Test The API Itself
//Also what about loading
//The Make A new model for the student
//Or Complete the current one
