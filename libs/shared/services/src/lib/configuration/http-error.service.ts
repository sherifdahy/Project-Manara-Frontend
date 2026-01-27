import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {

  constructor(private toast: ToastService) { }

  // =====================
  // Handle HTTP Error
  // =====================

  handle(error: any): void {
    const status = error?.status;
    const errorBody = error?.error;
    const errorMessage = this.extractErrorMessage(errorBody);

    switch (status) {
      case 400:
      case 409:
      case 422:
        this.handleValidationErrors(errorBody);
        break;

      case 401:
        this.toast.warning('Your session has expired. Please login again.', 'Session Expired');
        break;

      case 403:
        this.toast.error(errorMessage || 'You do not have permission.', 'Access Denied');
        break;

      case 404:
        this.toast.error(errorMessage || 'Resource not found.', 'Not Found');
        break;

      case 429:
        this.toast.warning('Too many requests. Please wait.', 'Rate Limited');
        break;

      case 500:
      case 502:
      case 503:
        this.toast.error('Server error. Please try again later.', 'Server Error');
        break;

      case 0:
        this.toast.error('No internet connection.', 'Connection Error');
        break;

      default:
        this.toast.error(errorMessage || 'An unexpected error occurred.', 'Error');
    }
  }

  // =====================
  // Validation Errors
  // =====================

  private handleValidationErrors(errorBody: any): void {
    const title = errorBody?.title || 'Error';
    const errors = errorBody?.errors;

    if (!errors || typeof errors !== 'object') {
      this.toast.error(title);
      return;
    }

    const messages = this.extractAllErrors(errors);

    if (messages.length === 0) {
      this.toast.error(title);
      return;
    }

    messages.forEach((msg, index) => {
      setTimeout(() => {
        this.toast.error(msg, title);
      }, index * 150);
    });
  }

  // =====================
  // Error Extraction
  // =====================

  private extractErrorMessage(errorBody: any): string | null {
    if (errorBody?.errors) {
      const messages = this.extractAllErrors(errorBody.errors);
      if (messages.length > 0) return messages[0];
    }
    return errorBody?.title || errorBody?.message || null;
  }

  private extractAllErrors(errors: any): string[] {
    if (!errors || typeof errors !== 'object') return [];

    const messages: string[] = [];

    Object.values(errors).forEach((fieldErrors: any) => {
      if (Array.isArray(fieldErrors)) {
        messages.push(...fieldErrors);
      } else if (typeof fieldErrors === 'string') {
        messages.push(fieldErrors);
      }
    });

    return messages;
  }

  // =====================
  // Form Errors Helpers
  // =====================

  getFieldErrors(error: any, fieldName: string): string[] {
    const errors = error?.error?.errors;
    if (!errors) return [];

    if (errors[fieldName]) {
      return Array.isArray(errors[fieldName]) ? errors[fieldName] : [errors[fieldName]];
    }

    const pascalCase = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
    if (errors[pascalCase]) {
      return Array.isArray(errors[pascalCase]) ? errors[pascalCase] : [errors[pascalCase]];
    }

    return [];
  }

  getFirstError(error: any, fieldName?: string): string | null {
    if (fieldName) {
      const errors = this.getFieldErrors(error, fieldName);
      return errors[0] || null;
    }

    const allErrors = this.extractAllErrors(error?.error?.errors);
    return allErrors[0] || null;
  }
}
