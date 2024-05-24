import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TopicService } from '../../services/topic.service';
import { Topic } from '../../shared/data/topic';

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent implements OnInit {

  topic: Topic | undefined;

  constructor(private route: ActivatedRoute, private topicService: TopicService) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.topicService.getTopicById(topicId).subscribe(
        (response: Topic) => {
          this.topic = response;
        }
      );
    }
  }

}
