import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-server-error',
  standalone: false,
  templateUrl: './server-error.component.html',
  styleUrls: ['./server-error.component.css']
})
export class ServerErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/']);
  }

  retry(): void {
    window.location.reload();
  }
}
