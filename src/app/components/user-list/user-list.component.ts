import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;
  actionLoading: { [key: string]: boolean } = {};
  actionError: { [key: string]: string } = {};
  
  constructor(private userService: UserService) { }
  
  ngOnInit(): void {
    this.loadUsers();
  }
  
  loadUsers(): void {
    this.loading = true;
    this.error = null;
    
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load users. Please try again later.';
        this.loading = false;
      }
    });
  }

  disableUser(userId: string): void {
    this.actionError[userId] = '';
    this.actionLoading[userId] = true;

    this.userService.disableUser(userId).subscribe({
      next: (response) => {
        if (response.success) {
          // Optionally refresh the user list or update the user's status locally
          this.loadUsers();
        } else {
          // Handle case where success is false
          this.actionError[userId] = response.message || 'Failed to disable user';
        }
        this.actionLoading[userId] = false;
      },
      error: (err) => {
        this.actionError[userId] = 'Failed to disable user';
        this.actionLoading[userId] = false;
      }
    });
  }

  deleteUser(userId: string): void {

    this.actionError[userId] = '';
    this.actionLoading[userId] = true;

    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        if (response.success) {

          this.users = this.users.filter(user => user.userId !== userId);
        } else {

          this.actionError[userId] = response.message || 'Failed to delete user';
        }
        this.actionLoading[userId] = false;
      },
      error: (err) => {
        this.actionError[userId] = 'Failed to delete user';
        this.actionLoading[userId] = false;
      }
    });
  }
}