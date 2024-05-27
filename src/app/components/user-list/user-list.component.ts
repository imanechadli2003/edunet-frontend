import {Component, Input} from '@angular/core';
import {UserCardComponent} from "../user-card/user-card.component";
import {CommonModule} from "@angular/common";
import {User} from "../../shared/data/user";

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

  constructor() { }
}
