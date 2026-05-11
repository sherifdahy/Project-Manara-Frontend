import { Component, NgZone, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { ProgramSubjectService } from '@project-manara-frontend/services';

import { SubjectResponse } from '@project-manara-frontend/models';
import { ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-program-sections-schedule',
  standalone: false,
  templateUrl: './program-sections-schedule.component.html',
  styleUrls: ['./program-sections-schedule.component.css'],
})
export class ProgramSectionsScheduleComponent implements OnInit {
  programId!: number;

  subjects: SubjectResponse[] = [];

  constructor(
    private readonly programSubjectService: ProgramSubjectService,
    private readonly activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
  ) {
    console.log(NgZone.isInAngularZone());
  }

  ngOnInit(): void {
    this.programId = this.activatedRoute.snapshot.parent?.params['id'];

    this.loadData();
  }

  loadData(): void {
    this.programSubjectService.getSubjects(this.programId).subscribe({
      next: (response) => {
        console.log('Inside Subscribe:', NgZone.isInAngularZone());

        this.subjects = response;
      },
    });
  }

  drop(event: CdkDragDrop<SubjectResponse[]>): void {
    moveItemInArray(this.subjects, event.previousIndex, event.currentIndex);
  }

  trackById(index: number, item: SubjectResponse): number {
    return item.id;
  }
}
