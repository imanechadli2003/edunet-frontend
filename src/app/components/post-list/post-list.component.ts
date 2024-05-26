import {Component, inject, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {PostComponent} from "../post/post.component";
import {PostService} from "../../services/post.service";
import {Post} from "../../shared/data/post";
import {EntityType} from "../../shared/data/entity-type";


@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    PostComponent
  ],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit {

  posts: Post[] = []

  @Input() id!: number;

  @Input() entityType!: EntityType;

  postService: PostService = inject(PostService);

  ngOnInit(): void {
    if (this.entityType === EntityType.Profile) {
      this.postService.getUserPosts(this.id).subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        });
    } else if (this.entityType === EntityType.Topic) {
      this.postService.getTopicPosts(this.id).subscribe(
        (posts: Post[]) => {
          this.posts = posts;
        });
    } else {
      throw new Error("Illegal argument exception");
    }
  }


  handlePostDeleted(id: number) {
    this.posts = this.posts.filter(post => post.id !== id);
  }
}
