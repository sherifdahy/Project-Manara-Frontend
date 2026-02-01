import { Component, Input, OnInit } from '@angular/core';
import { FacultyResponse } from '@project-manara-frontend/models';

@Component({
  selector: 'app-faculty-card',
  standalone: false,
  templateUrl: './faculty-card.component.html',
  styleUrls: ['./faculty-card.component.css']
})
export class FacultyCardComponent implements OnInit {
  @Input() faculty!: FacultyResponse;
  constructor() { }

  ngOnInit() {
  }

}
