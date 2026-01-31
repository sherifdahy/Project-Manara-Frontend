import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(
  passControlName: string = 'newPassword',
  confrimPassControlName: string = 'confirmPassword'
): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const pass = group.get(passControlName);
    const confirm = group.get(confrimPassControlName);

    if (!pass || !confirm) return null;

    if (pass.value !== confirm.value) {
      confirm.setErrors({ ...confirm.errors, UnmatchedPassword: true });
      return { UnmatchedPassword: true };
    } else {
      if (confirm.errors) {
        delete confirm.errors['UnmatchedPassword'];
        if (Object.keys(confirm.errors).length === 0) {
          confirm.setErrors(null);
        }
      }
      return null;
    }
  };
}
