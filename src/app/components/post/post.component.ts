import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Post} from "../../shared/data/post";
import {DatePipe} from "@angular/common";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {

  @Input() post!: Post;

  @Output() postDeleted: EventEmitter<any> = new EventEmitter();

  postApiUrl: string = "http://localhost:10000/api/posts";

  postService: PostService = inject(PostService);


  vote(v: number) {
    this.postService.vote(this.post.id, v).subscribe(
      (response) => {
        if (v === 1) {
          this.post.upVotes++;
        } else if (v === -1) {
          this.post.downVotes++;
        } else {
          throw new Error("Illegal argument");
        }
      }
    )
  }

  editPost() {
  }

  deletePost() {
    if (confirm('Are you sure you want to delete this post?')) {
      this.postService.delete(this.post.id).subscribe(() => {
        console.log('Post deleted:', this.post.id);
        this.postDeleted.emit(this.post.id);
      });
    }
  }
}
