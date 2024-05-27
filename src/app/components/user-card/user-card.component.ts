import {Component, inject, Input} from '@angular/core';
import {User} from "../../shared/data/user";
import {Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

  @Input() user!: User

  private router = inject(Router)

  constructor() { }

  navigateToProfile() {
    this.router.navigate(['/profile', this.user.id]);
  }
}
