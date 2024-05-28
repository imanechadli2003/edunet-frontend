import {Component, inject, Input} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {CommonModule} from "@angular/common";
import {User} from "../../shared/data/user";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    UserCardComponent,
    CommonModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  @Input() users: User[] = [];

  private userService = inject(UserService);

  constructor() { }

  deleteUserByAdmin(id: number) {
    this,this.userService.deleteAccountByAdmin(id).subscribe(
      response => {
        this.users.filter(user => user.id != id)
      });
  }
}
