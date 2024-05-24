import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../shared/data/topic';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  apiUrl = 'http://localhost:10000/api/topics';

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  };

  createTopic(topic: any) {
    this.http.post<Topic>(`${this.apiUrl}`, topic)
    .subscribe((response) => console.log(response));
  }

  getTopics(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.apiUrl}?page=0&size=10`)
  }

  getTopicById(topicId: string): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${topicId}`);
  }
}
