import { Injectable } from '@angular/core';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorService {

  constructor(private toast: ToastService) {}

  handle(error: any): void {
    const status = error?.status;
    const messages = this.extractMessages(error);

    if (messages.length) {
      messages.forEach(msg => this.toast.error(msg));
    } else {
      this.toast.error('An unexpected error occurred');
    }
  }

  private extractMessages(error: any): string[] {
    const errors = error?.error?.errors;
    if (!errors || typeof errors !== 'object') return [error?.error?.message || error?.statusText || 'Unknown error'];

    const messages: string[] = [];
    Object.values(errors).forEach((fieldErrors: any) => {
      if (Array.isArray(fieldErrors)) messages.push(...fieldErrors);
      else if (typeof fieldErrors === 'string') messages.push(fieldErrors);
    });

    return messages;
  }
}
