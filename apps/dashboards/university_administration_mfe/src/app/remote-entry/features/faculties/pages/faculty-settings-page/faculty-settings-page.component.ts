import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { FacultyRequest } from '@project-manara-frontend/models';
import { FacultyService, HttpErrorService } from '@project-manara-frontend/services';

@Component({
  selector: 'app-faculty-settings',
  standalone: false,
  templateUrl: './faculty-settings-page.component.html',
  styleUrls: ['./faculty-settings-page.component.css']
})
export class FacultySettingsPageComponent implements OnInit {
  facultyForm!: FormGroup;
  facultyId!: number;

  constructor(
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private route: ActivatedRoute,
    private router: Router,
    private httpErrorService: HttpErrorService,
  ) { }

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
      website: ['', [Validators.required, Validators.pattern(RegexPatternConsts.WEB_SITE_URL_PATTERN)]],
    });
  }

  loadFacultyData(): void {
    this.facultyService.get(this.facultyId).subscribe({
      next: (faculty) => {
        this.facultyForm.patchValue(faculty);
      },
      error: (error) => {
        this.httpErrorService.handle(error);
      }
    });
  }

  onSave(): void {
    if (this.facultyForm.valid) {

      var request = this.facultyForm.value as FacultyRequest;

      this.facultyService.update(this.facultyId, this.facultyForm.value).subscribe({
        next: () => {
          this.router.navigate(['..'], { relativeTo: this.route });
        },
        error: (error) => {
          this.httpErrorService.handle(error);
        }
      });
    }

    this.facultyForm.markAllAsTouched();
  }
}
