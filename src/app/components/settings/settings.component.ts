import {Component, inject} from '@angular/core';
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {

  private userService = inject(UserService);

  private router = inject(Router);

  constructor() {}

  confirmDeleteAccount() {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      this.userService.deleteAccount().subscribe(response => {
        alert("Account deleted successfully.");
        this.userService.logout()
      }, error => {
        alert("Failed to delete account. Please try again later.");
      });
    }
  }

  navigateToChangePassword() {
    this.router.navigate(['/change-password']);
  }
}
