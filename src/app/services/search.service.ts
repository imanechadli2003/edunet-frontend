import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../shared/data/topic';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchTopicsUrl: string = "http://localhost:10000/api/topics/search"
  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  search(query: string): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${this.searchTopicsUrl}?like=${query}&page=0&size=10`);
  }
}
