import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../shared/data/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private apiUrl = 'http://localhost:10000/api/topics';

  constructor(private http: HttpClient) {}

  getPostsByTopicId(topicId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/${topicId}/posts`);
  }
}
