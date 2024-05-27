import {Component, inject, OnInit} from '@angular/core';
import {TopicService} from "../../services/topic.service";
import {Topic} from "../../shared/data/topic";
import {TopicListComponent} from "../topic-list/topic-list.component";

@Component({
  selector: 'app-my-topics',
  standalone: true,
  imports: [TopicListComponent],
  templateUrl: './my-topics.component.html',
  styleUrl: './my-topics.component.css'
})
export class MyTopicsComponent implements OnInit {

  private topicService = inject(TopicService);

  topicList: Topic[] = [];

  ngOnInit(): void {
    this.topicService.getTopics().subscribe(
      (response) => this.topicList = response
    );
  }


}
