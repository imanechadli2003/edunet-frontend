import {Component, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Comment} from "../../shared/data/comment";

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent {

  @Input() comment!: Comment;

  ngOnInit(): void {
    console.log(this.comment);
  }

}
