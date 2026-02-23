import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  HttpErrorService,
  ToastService,
  UniversityService,
} from '@project-manara-frontend/services';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { filter, take } from 'rxjs';
import { UniversityRequest } from '@project-manara-frontend/models';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-university-setting-page',
  templateUrl: './university-setting-page.component.html',
  standalone: false,
  styleUrls: ['./university-setting-page.component.css'],
})
export class UniversitySettingPageComponent implements OnInit {
  universityForm!: FormGroup;
  universityId: number;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private universityService: UniversityService,
    private toastrService: ToastService,
    private httpErrorService: HttpErrorService,
    private route: ActivatedRoute
  ) {
    this.universityId = +this.route.parent?.snapshot.paramMap.get('id')!;
  }

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
    this.universityService.get(this.universityId).subscribe({
      next: (university) => {
        this.universityForm.patchValue(university);
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      },
    });
  }

  onSave(): void {
    if (this.universityForm.valid) {
      var request = this.universityForm.value as UniversityRequest;
      this.universityService.update(this.universityId, request).subscribe({
        next: () => {
          this.toastrService.success('University information updated successfully');
          this.universityForm.markAsPristine();
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        },
      });
    };
    this.universityForm.markAllAsTouched();
  }
}
