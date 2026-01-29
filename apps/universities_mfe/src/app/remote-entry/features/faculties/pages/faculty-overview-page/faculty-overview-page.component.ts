import { Component, OnInit } from '@angular/core';
import { Sec1 } from './sec-1/sec-1';
import { Sec2 } from './sec-2/sec-2';
import { Sec3 } from './sec-3/sec-3';

@Component({
  selector: 'app-faculty-overview-page',
  templateUrl: './faculty-overview-page.component.html',
  styleUrls: ['./faculty-overview-page.component.css'],
  imports: [Sec1, Sec2, Sec3],
})
export class FacultyOverviewPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
