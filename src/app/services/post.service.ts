import { HttpClient } from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/data/post';
import {UserService} from "./user.service";
import {Comment} from "../shared/data/comment";
import {API_BASE_URL} from "../../../config";

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private topicsUrl = `${API_BASE_URL}/topics`;

  private usersUrl = `${API_BASE_URL}/users`;

  private postsUrl = `${API_BASE_URL}/posts`;

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

  addComment(id: number, comment: string): Observable<Comment> {
    return this.http.post<Comment>(`${this.postsUrl}/${id}/comments`, {comment: comment});
  }

  getComments(id: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.postsUrl}/${id}/comments`);
  }
}
