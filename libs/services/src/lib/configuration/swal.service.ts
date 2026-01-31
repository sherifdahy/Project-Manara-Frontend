import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export interface ConfirmConfig {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  icon?: 'warning' | 'question' | 'info';
}

@Injectable({
  providedIn: 'root',
})
export class SwalService {

  // =====================
  // Alert Dialogs
  // =====================

  success(title: string, text?: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
      timer: 2000,
      showConfirmButton: false,
    });
  }

  error(title: string, text?: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonColor: '#0a1f44',
    });
  }

  warning(title: string, text?: string): void {
    Swal.fire({
      icon: 'warning',
      title,
      text,
      confirmButtonColor: '#0a1f44',
    });
  }

  info(title: string, text?: string): void {
    Swal.fire({
      icon: 'info',
      title,
      text,
      confirmButtonColor: '#0a1f44',
    });
  }

  // =====================
  // Confirm Dialogs
  // =====================

  async confirm(config: ConfirmConfig): Promise<boolean> {
    const result = await Swal.fire({
      title: config.title,
      text: config.text,
      icon: config.icon || 'question',
      showCancelButton: true,
      confirmButtonColor: '#0a1f44',
      cancelButtonColor: '#6c757d',
      confirmButtonText: config.confirmText || 'Yes',
      cancelButtonText: config.cancelText || 'Cancel',
      reverseButtons: true,
    });

    return result.isConfirmed;
  }

  async confirmDelete(title?: string, text?: string): Promise<boolean> {
    return this.confirm({
      title: title || 'Delete?',
      text: text || 'This action cannot be undone.',
      confirmText: 'Yes, delete',
      icon: 'warning',
    });
  }

  async confirmRestore(title?: string, text?: string): Promise<boolean> {
    return this.confirm({
      title: title || 'Restore?',
      text: text || 'This item will be restored.',
      confirmText: 'Yes, restore',
      icon: 'question',
    });
  }

  // =====================
  // Loading
  // =====================

  showLoading(title: string = 'Please wait...'): void {
    Swal.fire({
      title,
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });
  }

  hideLoading(): void {
    Swal.close();
  }
}
