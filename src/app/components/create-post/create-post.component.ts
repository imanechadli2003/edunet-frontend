import {Component, Inject, inject, OnInit} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../../services/post.service";

@Component({
  selector: 'app-create-topic-posts',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.css'
})
export class CreatePostComponent implements OnInit {

  postForm!: FormGroup;

  id!: number;

  fb = inject(FormBuilder);

  postService = inject(PostService);

  userService = inject(UserService);

  constructor(route: ActivatedRoute) {
    // @ts-ignore
    this.id = +route.snapshot.paramMap.get('id')
  }

  ngOnInit(): void {
    this.postForm = this.fb.group({content: ['', Validators.required]});
  }

  onSubmit(): void {
    if (!this.postForm.valid) {
      return;
    }
    const post = this.postForm.getRawValue();
    if (this.id != 0) {
      this.postService.createPost(this.id, post).subscribe(
        response => {
          console.log(response)
        },
        error => {console.error('Error creating topic-posts', error);});
    } else {
      console.log("creating user post");
      this.userService.createUserPost(post).subscribe(
        response => {
          console.log(response)
        },
        error => {console.error('Error creating topic-posts', error);});
    }
  }

}
