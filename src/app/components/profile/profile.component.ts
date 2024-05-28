import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Profile } from '../../shared/data/profile';
import {Post} from "../../shared/data/post";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PostComponent} from "../post/post.component";
import {PostListComponent} from "../post-list/post-list.component";
import {EntityType} from "../../shared/data/entity-type";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, PostComponent, PostListComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profile: Profile | null = null;

  userService = inject(UserService);

  postService = inject(PostService);

  userId: number

  posts: Post[] = []

  router: Router = inject(Router);

  constructor(route: ActivatedRoute) {
    // @ts-ignore
    this.userId = +route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    this.userService.getCurrentUserProfile(this.userId).subscribe(
      (profile: Profile) => {
        this.profile = profile;
        console.log('User profile data:', this.profile);
        this.userService.getUserPosts(this.userId).subscribe(
          (posts: Post[]) => {
            this.posts = posts;
          }
        )
      },
      (error) => {
        console.error('Error fetching user profile data:', error);
      }
    );
  }

  createNewPost() {
    this.router.navigateByUrl(`/create-post/0`);
  }

  protected readonly EntityType = EntityType;
}
