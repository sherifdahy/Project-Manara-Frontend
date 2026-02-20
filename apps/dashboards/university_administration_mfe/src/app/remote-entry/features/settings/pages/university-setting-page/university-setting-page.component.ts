import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { selectUniversityId } from '../../../../store/selectors/university.selectors';
import {
  HttpErrorService,
  ToastService,
  UniversityService,
} from '@project-manara-frontend/services';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { filter, take } from 'rxjs';
import { UniversityRequest } from '@project-manara-frontend/models';
import { getUniversityAction } from '../../../../store/actions/get-university.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university-setting-page',
  templateUrl: './university-setting-page.component.html',
  standalone: false,
  styleUrls: ['./university-setting-page.component.css'],
})
export class UniversitySettingPageComponent implements OnInit {
  universityForm!: FormGroup;
  universityId$ = this.store.select(selectUniversityId);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private universityService: UniversityService,
    private toastrService: ToastService,
    private httpErrorService: HttpErrorService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadUniversityData();
  }

  initForm(): void {
    this.universityForm = this.fb.group({
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
      yearOfEstablishment: ['', Validators.required],
    });
  }

  loadUniversityData(): void {
    this.universityId$
      .pipe(
        filter((id) => !!id),
        take(1),
      )
      .subscribe((id) =>
        this.universityService.get(id!).subscribe({
          next: (university) => {
            this.universityForm.patchValue(university);
          },
          error: (error) => {
            this.httpErrorService.handle(error);
          },
        }),
      );
  }

  onSave(): void {
    if (this.universityForm.valid) {
      var request = this.universityForm.value as UniversityRequest;
      console.log(request);
      this.universityId$
        .pipe(
          filter((id) => !!id),
          take(1),
        )
        .subscribe((id) => {
          this.universityService.update(id!, request).subscribe({
            next: () => {
              this.store.dispatch(getUniversityAction());
              this.toastrService.success('University information updated successfully');
            },
            error: (error) => {
              this.httpErrorService.handle(error);
            },
          });
        });
    }

    this.universityForm.markAllAsTouched();
  }
}
