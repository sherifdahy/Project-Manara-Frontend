import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { RegexPatternConsts } from '@project-manara-frontend/consts';
import { FacultyRequest } from '@project-manara-frontend/models';
import { FacultyService, HttpErrorService, ToastService } from '@project-manara-frontend/services';
import { filter, take } from 'rxjs';
import { selectFacultyId } from '../../../../store/selectors/faculty.selectors';
import { getFacultyAction } from '../../../../store/actions/get-faculty.actions';

@Component({
  selector: 'app-settings-page',
  standalone: false,
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css']
})
export class SettingsPageComponent implements OnInit {

  facultyForm!: FormGroup;
  facultyId$ = this.store.select(selectFacultyId);

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private facultyService: FacultyService,
    private toastrService: ToastService,
    private httpErrorService: HttpErrorService,
  ) { }

  ngOnInit(): void {
    this.initForm();
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
    this.facultyId$.pipe(
      filter((id) => !!id),
      take(1)
    ).subscribe(
      (id) =>
        this.facultyService.get(id!).subscribe({
          next: (faculty) => {
            this.facultyForm.patchValue(faculty)
          },
          error: (error) => {
            this.httpErrorService.handle(error);
          }
        })
    )
  }

  onSave(): void {
    if (this.facultyForm.valid) {

      var request = this.facultyForm.value as FacultyRequest;


      this.facultyId$.pipe(
        filter((id) => !!id),
        take(1)
      ).subscribe((id) => {
        this.facultyService.update(id!, request).subscribe({
          next: () => {
            this.store.dispatch(getFacultyAction());
            this.toastrService.success('done');
          },
          error: (error) => {
            this.httpErrorService.handle(error);
          }
        });
      })


    }

    this.facultyForm.markAllAsTouched();
  }

}
