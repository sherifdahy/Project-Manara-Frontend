import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

interface ErrorConfig {
  key: string;
  message: string;
  params?: (errors: ValidationErrors) => object;
}

@Component({
  selector: 'app-display-error',
  standalone: false,
  templateUrl: './display-error.component.html',
  styleUrls: ['./display-error.component.css']
})
export class DisplayErrorComponent {

  @Input() control: AbstractControl | null = null;
  @Input() showOnTouched: boolean = true;
  @Input() showOnDirty: boolean = false;
  @Input() fieldName: string = '';



  private errorConfigs: ErrorConfig[] = [
    {
      key: 'required',
      message: 'validation.required'
    },
    {
      key: 'email',
      message: 'validation.email'
    },
    {
      key: 'minlength',
      message: 'validation.minLength',
      params: (errors) => ({ min: errors['minlength']?.requiredLength })
    },
    {
      key: 'maxlength',
      message: 'validation.maxLength',
      params: (errors) => ({ max: errors['maxlength']?.requiredLength })
    },
    {
      key: 'min',
      message: 'validation.min',
      params: (errors) => ({ min: errors['min']?.min })
    },
    {
      key: 'max',
      message: 'validation.max',
      params: (errors) => ({ max: errors['max']?.max })
    },
    {
      key: 'pattern',
      message: 'validation.pattern'
    },
    {
      key: 'UnmatchedPassword',
      message: 'validation.unmatchedPassword'
    },
  ];

  // =====================
  // Getters
  // =====================

  get shouldShow(): boolean {
    if (!this.control || !this.control.errors) return false;

    if (this.showOnDirty) {
      return this.control.dirty;
    }

    return this.showOnTouched ? this.control.touched : true;
  }

  get errors(): { message: string; params: object }[] {
    if (!this.control?.errors) return [];

    const result: { message: string; params: object }[] = [];
    const controlErrors = this.control.errors;

    // Check configured errors
    for (const config of this.errorConfigs) {
      if (controlErrors[config.key]) {
        result.push({
          message: config.message,
          params: config.params ? config.params(controlErrors) : {}
        });
      }
    }

    // Check custom error (from setErrors)
    if (controlErrors['custom']) {
      result.push({
        message: controlErrors['custom'],
        params: {}
      });
    }

    // Check server error
    if (controlErrors['server']) {
      const serverErrors = controlErrors['server'];
      if (Array.isArray(serverErrors)) {
        serverErrors.forEach(err => {
          result.push({ message: err, params: {} });
        });
      } else {
        result.push({ message: serverErrors, params: {} });
      }
    }

    return result;
  }

  // Get first error only (optional)
  get firstError(): { message: string; params: object } | null {
    const allErrors = this.errors;
    return allErrors.length > 0 ? allErrors[0] : null;
  }

  // =====================
  // Helper Methods
  // =====================

  isTranslationKey(message: string): boolean {
    return message.startsWith('validation.');
  }
}
