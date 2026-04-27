// slot-detail-dialog.component.ts

import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import {
  SlotDialogData,
  SlotDialogResult,
  StaffMember,
} from '@project-manara-frontend/view-models';

@Component({
  selector: 'app-slot-detail-dialog',
  templateUrl: './slot-detail-dialog.component.html',
  styleUrls: ['./slot-detail-dialog.component.css'],
  standalone: false,
})
export class SlotDetailDialogComponent implements OnInit, OnDestroy {
  form!: FormGroup;

  // ─── Search Controls ───────────────────────────────────
  doctorSearchCtrl = new FormControl('');
  instructorSearchCtrl = new FormControl('');  // ← اتغير

  // ─── Filtered Lists ────────────────────────────────────
  filteredDoctors: StaffMember[] = [];
  filteredInstructors: StaffMember[] = [];     // ← اتغير

  private destroy$ = new Subject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<
      SlotDetailDialogComponent,
      SlotDialogResult
    >,
    @Inject(MAT_DIALOG_DATA) public data: SlotDialogData,
  ) {}

  ngOnInit(): void {
    // ✅ اتغير من assistantId → instructorId
    this.form = this.fb.group({
      doctorId: [this.data.selectedDoctorId],
      instructorId: [this.data.selectedInstructorId],
    });

    // Initialize filtered lists
    this.filteredDoctors = [...this.data.doctors];
    this.filteredInstructors = [...this.data.instructors];  // ← اتغير

    // Doctor search
    this.doctorSearchCtrl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((query) => {
        this.filteredDoctors = this.filterStaff(
          this.data.doctors,
          query ?? '',
        );
      });

    // ✅ Instructor search (كان Assistant)
    this.instructorSearchCtrl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((query) => {
        this.filteredInstructors = this.filterStaff(
          this.data.instructors,               // ← اتغير
          query ?? '',
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private filterStaff(list: StaffMember[], query: string): StaffMember[] {
    const q = (query ?? '').trim().toLowerCase();
    if (!q) return [...list];
    return list.filter((s) => s.name.toLowerCase().includes(q));
  }

  onSave(): void {
    this.dialogRef.close(this.form.value as SlotDialogResult);
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}