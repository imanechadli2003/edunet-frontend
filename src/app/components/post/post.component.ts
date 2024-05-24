import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../services/post.service';
import { Post } from '../../shared/data/post';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  posts: Post[] = [];
  topicName: string | undefined;

  constructor(private route: ActivatedRoute, private postService: PostService) {}

  ngOnInit(): void {
    const topicId = this.route.snapshot.paramMap.get('id');
    if (topicId) {
      this.postService.getPostsByTopicId(topicId).subscribe(
        (response: Post[]) => {
          this.posts = response;
          this.topicName = response[0].topicName;
        }
      );
    }
  }
}
