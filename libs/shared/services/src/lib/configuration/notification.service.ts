import { ElementRef, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  handleError(
    errors: any,
    formKeyValue?: string,
    errorMessageRef?: ElementRef<HTMLDivElement>
  ) {
    const formError = errors?.[formKeyValue?? 0]?.[0];

    if (formError && errorMessageRef) {
      this.assignToForm(errorMessageRef, formError);
    } else {
      this.assignToToast(errors);
    }
  }

  private assignToForm(errorRef: ElementRef<HTMLDivElement>, error: string) {
    errorRef.nativeElement.innerHTML = error;
    errorRef.nativeElement.classList.remove('d-none');
  }

  private assignToToast(errors: any) {
    const firstKey = Object.keys(errors)[0];
    const firstError = errors[firstKey][0];
    this.toastr.error(firstError);
  }
}
