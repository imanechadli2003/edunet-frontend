import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Profile } from '../../shared/data/profile';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile: Profile | null = null;

  userService = inject(UserService);


  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userService.getCurrentUserProfile().subscribe(
      (profile: Profile) => {
        this.profile = profile;
        console.log('User profile data:', this.profile);
      },
      (error) => {
        console.error('Error fetching user profile data:', error);
      }
    );
  }
}