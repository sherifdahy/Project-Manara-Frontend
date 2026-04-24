import { ProfileService } from './../../../../../../../../../../libs/services/src/lib/profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from './../../../../../../../../../../libs/services/src/lib/configuration/loader.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserInfoResponse } from 'libs/models/src/lib/profile/responses/university-detail-response';
import { HttpErrorService } from '@project-manara-frontend/services';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.css'],
  standalone: false,
})
export class PersonalInfoComponent implements OnInit {
  isLoading: boolean = false;
  personalInfoForm: FormGroup;
  constructor(
    private loaderService: LoaderService,
    private fb: FormBuilder,
    private profileService: ProfileService,
    private httpErrorService: HttpErrorService,
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService,
  ) {
    this.personalInfoForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
    });
  }

  ngOnInit() {
    this.loaderService.loading();
    this.profileService.getMyInfo().subscribe({
      next: (res: UserInfoResponse) => {
        this.personalInfoForm.patchValue({
          name: res.name || 'system admin',
          email: res.email,
          phoneNumber: res.phoneNumber,
        });
        this.loaderService.hide();
      },
      error: (err) => {
        this.loaderService.hide();
        this.httpErrorService.handle(err);
      },
    });
  }
  updateUserData() {
    this.isLoading = true;
    this.profileService
      .updateMyInfo({
        phoneNumber: this.personalInfoForm.get('phoneNumber')?.value,
      })
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.cdr.markForCheck();
          this.toaster.success('phone changed successfully', 'success');
        },
        error: (err) => {
          this.isLoading = false;
          this.cdr.markForCheck();
          this.httpErrorService.handle(err);
        },
      });
  }
}
