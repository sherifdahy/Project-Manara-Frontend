import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { UserService } from '@project-manara-frontend/services';

@Directive({
  selector: '[hasPermission]',
  standalone: true
})
export class HasPermissionDirective implements OnInit {

  @Input('hasPermission') permission!: string;

  constructor(
    private el: ElementRef,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const user = this.userService.currentUser;

    if (!user || !user.permissions.includes(this.permission)) {
      this.el.nativeElement.classList = 'd-none';
    }
  }
}
