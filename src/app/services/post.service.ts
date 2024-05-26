import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/data/post';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private topicsUrl = 'http://localhost:10000/api/topics';

  private usersUrl = 'http://localhost:10000/api/users';

  private postsUrl = 'http://localhost:10000/api/posts';

  private userService = inject(UserService);

  constructor(private http: HttpClient) {}

  createPost(topicId: number | undefined, post: any): Observable<Post> {
    return this.http.post<Post>(`${this.topicsUrl}/${topicId}/posts`, post)
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.postsUrl}/${id}`);

  }

  getUserPosts(id: number): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.usersUrl}/${id}/posts/public`);
  }

  getTopicPosts(id: number) {
    return this.http.get<Post[]>(`${this.topicsUrl}/${id}/posts`);
  }

  vote(id: number, v: number): Observable<any> {
    return this.http.post(`${this.postsUrl}/vote/${id}`, {v: v})
  }
}
