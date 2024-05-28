import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {User} from "../../shared/data/user";
import {Router, RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    RouterLink, CommonModule
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: User

  @Output() adminDeleteUser = new EventEmitter()

  private router = inject(Router)

  userService = inject(UserService);

  constructor() { }

  navigateToProfile() {
    this.router.navigate(['/profile', this.user.id]);
  }

  deleteUser() {
    this.adminDeleteUser.emit(this.user.id);
  }
}
