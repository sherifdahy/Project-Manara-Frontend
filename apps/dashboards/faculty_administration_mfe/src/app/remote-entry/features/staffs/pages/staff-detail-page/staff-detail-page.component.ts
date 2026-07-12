import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacultyUserResponse } from '@project-manara-frontend/models';
import {
  FacultyUserService,
  HttpErrorService,
  LoaderService,
  UserService,
} from '@project-manara-frontend/services';
import { Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-staff-detail-page',
  standalone: false,
  templateUrl: './staff-detail-page.component.html',
  styleUrls: ['./staff-detail-page.component.css'],
})
export class StaffDetailPageComponent implements OnInit, OnDestroy {
  staff$!: Observable<FacultyUserResponse>;
  staffId!: number;

  private destroy$ = new Subject<void>();
  private userService = inject(UserService);
  private facultyUserService = inject(FacultyUserService);
  private httpErrorService = inject(HttpErrorService);
  private loaderService = inject(LoaderService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  ngOnInit(): void {
    this.staffId = +this.route.snapshot.params['id'];

    if (!this.staffId) {
      this.router.navigate(['/staff']);
      return;
    }

    this.loadStaffData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadStaffData(): void {
    this.loaderService.loading();
    this.staff$ = this.facultyUserService.get(this.staffId);
    this.staff$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.loaderService.hide();
      },
      error: (error) => {
        this.loaderService.hide();
        this.httpErrorService.handle(error);
        this.router.navigate(['/staff']);
      },
    });
  }

  /**
   * Check if current user can access the "Basic Information" tab.
   * Requires: facultyUsers:read
   */
  canAccessBasicInfo(): boolean {
    const user = this.userService.currentUser;
    return !!user?.permissions?.includes('facultyUsers:read');
  }

  /**
   * Check if current user can access the "Permissions" tab.
   * Requires: facultyUsers:read (to view) and preferably facultyUsers:update
   * (if they want to actually modify permissions on the child route).
   */
  canAccessPermissions(): boolean {
    const user = this.userService.currentUser;
    return !!user?.permissions?.includes('facultyUsers:read');
  }
}