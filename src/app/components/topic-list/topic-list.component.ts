import { CommonModule } from '@angular/common';
import {Component, OnInit, inject, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../shared/data/topic';
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-topic-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topic-list.component.html',
  styleUrl: './topic-list.component.css'
})
export class TopicListComponent implements OnInit {

  router = inject(Router);

  @Input() topicList: Topic[] = [];

  topicService: TopicService = inject(TopicService);

  userService = inject(UserService);

  ngOnInit(): void {
  }

  createNewTopic() {
    this.router.navigateByUrl("/create-topic")
  }

  deleteTopic(id: number) {
    this.userService.deleteTopicByAdmin(id).subscribe(
      response => {
        this.topicList.filter(topic => topic.id !== id);
      }
    )
  }
}
