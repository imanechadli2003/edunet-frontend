import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {Comment} from "../../shared/data/comment";
import {PostService} from "../../services/post.service";
import {CommentComponent} from "../comment/comment.component";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-comment-section',
  standalone: true,
  imports: [
    CommentComponent, CommonModule, FormsModule
  ],
  templateUrl: './comment-section.component.html',
  styleUrl: './comment-section.component.css'
})
export class CommentSectionComponent {

  @Input() postId!: number;

  @Output() commentAdded = new EventEmitter<Comment>();

  comments: Comment[] = [];

  private postService = inject(PostService);

  newComment = '';

  constructor() {}

  ngOnInit(): void {
    this.loadComments();
  }

  loadComments(): void {
    this.postService.getComments(this.postId).subscribe(comments => {
      this.comments = comments;
    });
  }

  addComment(): void {
    if (this.newComment.trim()) {
      this.postService.addComment(this.postId, this.newComment.trim()).subscribe(comment => {
        this.comments.push(comment);
        this.commentAdded.emit();
        this.newComment = '';
      });
    }
  }

}
