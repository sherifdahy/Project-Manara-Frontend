import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-access-denied',
  standalone: false,
  templateUrl: './access-denied.component.html',
  styleUrls: ['./access-denied.component.css']
})
export class AccessDeniedComponent {

  private returnUrl: string | null;
  goBackEnable: boolean = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
  }

  goBack(): void {
    if (this.returnUrl) {
      this.goBackEnable = true;
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
