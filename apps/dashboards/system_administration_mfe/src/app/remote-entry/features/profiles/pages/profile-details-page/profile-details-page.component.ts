import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details-page',
  templateUrl: './profile-details-page.component.html',
  styleUrls: ['./profile-details-page.component.css'],
  standalone: false,
})
export class ProfileDetailsPageComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}

  goTo(path: string) {
    this.router.navigate([`/system-administration/profiles/${path}`]);
  }
}
