import { Component, OnInit } from '@angular/core';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { NotificationService } from 'src/app/services/notification.service';
import { Notification } from 'src/app/models/notification'; // Import your interface

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  loading = false;
  error: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  loadNotifications(): void {
    this.loading = true;
    this.error = null;

    this.notificationService.getNotifications()
      .pipe(
        catchError(err => {
          this.error = 'Failed to load notifications';
          return of(null);
        }),
        finalize(() => this.loading = false)
      )
      .subscribe(response => {
        if (response?.success) {
          this.notifications = response.data;
        }
      });
  }

  deleteNotification(id: number): void {
    const confirmDelete = window.confirm('Are you sure you want to delete this notification?');
    
    if (confirmDelete) {
      this.notificationService.deleteNotification(id)
        .pipe(
          catchError(err => {
            this.error = 'Failed to delete notification';
            return of(null);
          })
        )
        .subscribe(response => {
          this.notifications = this.notifications.filter(n => n.id !== id);
        });
    }
  }
}
