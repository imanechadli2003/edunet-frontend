import {Component, inject, OnInit} from '@angular/core';
import {UserListComponent} from "../user-list/user-list.component";
import {User} from "../../shared/data/user";
import {ActivatedRoute} from "@angular/router";
import {TopicService} from "../../services/topic.service";

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [
    UserListComponent
  ],
  templateUrl: './members.component.html',
  styleUrl: './members.component.css'
})
export class MembersComponent implements OnInit {

  members: User[] = [];

  id!: number;

  topicService = inject(TopicService);

  constructor(route: ActivatedRoute) {
    // @ts-ignore
    this.id = +route.snapshot.paramMap.get("id");
  }

  ngOnInit(): void {
    this.topicService.getMembersOfTopic(this.id).subscribe(
      (members) => this.members = members,
    )
  }
}
