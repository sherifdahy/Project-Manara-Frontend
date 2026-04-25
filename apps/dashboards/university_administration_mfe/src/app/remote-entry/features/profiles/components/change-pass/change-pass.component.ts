import {
  HttpErrorService,
  ProfileService,
} from '@project-manara-frontend/services';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css'],
  standalone: false,
})
export class ChangePassComponent implements OnInit {
  showPass: boolean = false;
  showNewPass: boolean = false;
  updatedPassForm: FormGroup;
  isLoading: boolean = false;
  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef,
    private toaster: ToastrService,
    private httpErrorService: HttpErrorService,
  ) {
    this.updatedPassForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: [
        '',
        [
          Validators.required,

          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
          ),
        ],
      ],
    });
  }

  ngOnInit() {}
  get currentPassword(): any {
    return this.updatedPassForm.get('currentPassword');
  }

  get newPassword(): any {
    return this.updatedPassForm.get('newPassword');
  }

  changePassword() {
    this.isLoading = true;
    this.profileService.changePass(this.updatedPassForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.cdr.markForCheck();
        this.toaster.success('password changed successfully', 'success');
        this.init();
      },
      error: (err) => {
        this.isLoading = false;
        this.cdr.markForCheck();
        this.httpErrorService.handle(err);
      },
    });
  }

  init() {
    this.updatedPassForm.reset({
      currentPassword: '',
      newPassword: '',
    });
    this.showPass = false;
    this.showNewPass = false;
  }
}
