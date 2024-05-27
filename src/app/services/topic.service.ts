import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../shared/data/topic';
import {JoinRequest} from "../shared/data/join-request";
import {User} from "../shared/data/user";

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

  getTopicById(topicId: number): Observable<Topic> {
    return this.http.get<Topic>(`${this.apiUrl}/${topicId}`);
  }

  getMembership(id: number) {
    return this.http.get(`${this.apiUrl}/${id}/membership`)
  }

  join(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/join`, {});
  }

  leave(id: number) {
    return this.http.post(`${this.apiUrl}/${id}/leave`, {})
  }

  getJoinRequests(id: number): Observable<JoinRequest[]> {
    return this.http.get<JoinRequest[]>(`${this.apiUrl}/${id}/requests`);
  }

  acceptJoinRequest(requestId: number) {
    console.log({requestId: requestId, accept: true});
    return this.http.post(`${this.apiUrl}/responses`, {requestId: requestId, accepted: true})
  }

  rejectJoinRequest(requestId: number) {
    return this.http.post(`${this.apiUrl}/responses`, {requestId: requestId, accepted: false})
  }

  deleteTopic(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  getMembersOfTopic(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/${id}/members`);
  }
}
