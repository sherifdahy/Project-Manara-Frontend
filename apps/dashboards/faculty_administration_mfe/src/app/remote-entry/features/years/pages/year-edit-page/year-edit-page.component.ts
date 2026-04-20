import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TermResponse, YearRequest } from '@project-manara-frontend/models';
import {
  HttpErrorService,
  LoaderService,
  YearsService,
} from '@project-manara-frontend/services';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';

@Component({
  selector: 'app-year-edit-page',
  standalone: false,
  templateUrl: './year-edit-page.component.html',
  styleUrls: ['./year-edit-page.component.css'],
})
export class YearEditPageComponent implements OnInit {
  yearForm!: FormGroup;
  yearId!: number;
  terms$!: Observable<TermResponse[]>;

  constructor(
    private fb: FormBuilder,
    private yearService: YearsService,
    private route: ActivatedRoute,
    private httpErrorService: HttpErrorService,
    private toastrService: ToastrService,
    private loaderService: LoaderService,
  ) {}

  ngOnInit() {
    this.initForm();
    this.yearId = Number(this.route.parent?.snapshot.params['id']);
    this.loadTerms();
    this.loadYearData();
  }

  initForm(): void {
    this.yearForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      activeTermId: ['', [Validators.required]],
    });
  }

  loadYearData(): void {
    this.yearService.get(this.yearId).subscribe({
      next: (year) => {
        this.yearForm.patchValue({
          ...year,
          startDate: this.formatDate(year.startDate),
          endDate: this.formatDate(year.endDate),
        });
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      },
    });
  }

  private loadTerms() {
    this.loaderService.loading();
    this.terms$ = this.yearService
      .getAllTerms()
      .pipe(finalize(() => this.loaderService.hide()));
  }

  private formatDate(date: string): string {
    if (!date) return '';
    return new Date(date).toISOString().split('T')[0];
  }

  onSave() {
    if (this.yearForm.valid) {
      var request = this.yearForm.value as YearRequest;
      this.yearService.update(this.yearId, request).subscribe({
        next: () => {
          this.toastrService.success('Year information updated successfully');
          this.yearForm.markAsPristine();
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
    }
    this.yearForm.markAllAsTouched();
  }
}
