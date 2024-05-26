import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../shared/data/topic';
import {User} from "../shared/data/user";

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTopicsUrl: string = "http://localhost:10000/api/topics/search";

  searchUserUrl: string = "http://localhost:10000/api/users/search";

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  searchTopics(name: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.searchTopicsUrl}?like=${name}&page=0&size=10`);
  }

  searchUsers(name: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.searchUserUrl}?like=${name}&page=0&size=10`);
  }
}
