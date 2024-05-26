import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {TopicService} from '../../services/topic.service';
import {Topic} from '../../shared/data/topic';
import {PostComponent} from "../post/post.component";
import {PostListComponent} from "../post-list/post-list.component";
import {EntityType} from "../../shared/data/entity-type";
import {Membership} from "../../shared/data/membership";

@Component({
  selector: 'app-topic',
  standalone: true,
  imports: [CommonModule, RouterLink, PostComponent, PostListComponent],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css'
})
export class TopicComponent implements OnInit {

  topic: Topic | undefined;

  topicName: string | undefined;

  id: number;

  router = inject(Router);

  membership: string = "NONE";

  constructor(private route: ActivatedRoute, private topicService: TopicService) {
    // @ts-ignore
    this.id = +this.route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    if (this.id) {
      this.topicService.getTopicById(this.id).subscribe(
        (response: Topic) => {
          this.topic = response;
          this.topicName = response.name;
        }
      );
      this.topicService.getMembership(this.id).subscribe(
        (response: any) => {
          this.membership = response.membership;
        }
      )
    }
  }

  createNewPost() {
    this.router.navigate(['/create-post', this.id]);
  }

  protected readonly EntityType = EntityType;

  leaveTopic() {
    // TODO
  }

  joinTopic() {
    // TODO
  }
}
