import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { AccountService } from '@project-manara-frontend/services';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {

  @Input('hasPermission') permission!: string;

  constructor(
    private el: ElementRef,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    const user = this.accountService.currentUser;

    if (!user || !user.permissions.includes(this.permission)) {
      this.el.nativeElement.classList = 'd-none';
    }
  }
}
