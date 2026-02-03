import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FacultyResponse } from '@project-manara-frontend/models';

@Component({
  selector: 'app-faculty-card',
  standalone: false,
  templateUrl: './faculty-card.component.html',
  styleUrls: ['./faculty-card.component.css']
})
export class FacultyCardComponent implements OnInit {
  @Input() faculty!: FacultyResponse;
  universityId!: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.universityId = Number(this.route.snapshot.paramMap.get('id'));
  }

}
