import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginData } from '../shared/data/login';
import { Profile } from '../shared/data/profile';
import { Token } from '../shared/data/token';
import { User } from '../shared/data/user';
import {Post} from "../shared/data/post";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:10000/api';

  currentUserSig = signal<User | undefined | null>(undefined);

  constructor(private http: HttpClient) {
  }

  login(user: LoginData): Observable<boolean> {
    return this.http.post<Token>(this.apiUrl + "/auth/token", user)
      .pipe(
        map((response) => {
          console.log("response: user: ", response);
          localStorage.setItem('token', response.token);
          this.currentUserSig.set({
            id: response.id,
            handle: response.handle,
            role: response.role
          });
          return true;
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Unauthorized error:', error.message);
          } else {
            console.error('An error occurred:', error.message);
          }
          return of(false);
        })
      );
  }

  register(user: any) {
    console.log(user);
    this.http.post(this.apiUrl + "/users/signup", user)
    .subscribe((response) => console.log("response", response));
  }

  getCurrentUserProfile(id: number) {
    return this.http.get<Profile>(`${this.apiUrl}/users/${id}`);
  }

  getAuthenticatedUserProfile() {
    return this.http.get<Profile>(`${this.apiUrl}/users/${this.currentUserSig()?.id}`);
  }

  getUserPosts(id: number) {
    return this.http.get<Post[]>(`${this.apiUrl}/users/${id}/posts/public`)
  }

  createUserPost(post: any): Observable<Post> {
    console.log("sending request");
    return this.http.post<Post>(`${this.apiUrl}/users/posts/public`, post);
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSig.set(null);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${this.currentUserSig()?.id}`);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/change-password/${this.currentUserSig()?.id}`, data);
  }

  deleteAccountByAdmin(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/users/${id}`);
  }

  isAdmin() {
    const currentUser = this.currentUserSig();
    console.log(currentUser?.role);
    return currentUser?.role === 'SCOPE_admin';
  }

  deleteTopicByAdmin(id: number) {
    return this.http.delete(`${this.apiUrl}/admin/topics/${id}`);
  }
}
