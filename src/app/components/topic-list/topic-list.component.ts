import { CommonModule } from '@angular/common';
import {Component, OnInit, inject, Input} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../shared/data/topic';

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

  ngOnInit(): void {
  }

  createNewTopic() {
    this.router.navigateByUrl("/create-topic")
  }

}
