import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { LoginData } from '../shared/data/login';
import { Profile } from '../shared/data/profile';
import { Token } from '../shared/data/token';
import { User } from '../shared/data/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:10000/api';

  currentUserSig = signal<User | undefined | null>(undefined);

  constructor(private http: HttpClient) {}

  login(user: LoginData): Observable<boolean> {
    return this.http.post<Token>(this.apiUrl + "/auth/token", user)
      .pipe(
        map((response) => {
          console.log("response: user: ", response);
          localStorage.setItem('token', response.token);
          this.currentUserSig.set({
            id: response.id,
            handle: response.handle
          });
          return true; // Indicate success
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            console.error('Unauthorized error:', error.message);
          } else {
            console.error('An error occurred:', error.message);
          }
          return of(false); // Indicate failure
        })
      );
  }

  register(user: any) {
    console.log(user);
    this.http.post(this.apiUrl + "/users/signup", user)
    .subscribe((response) => console.log("response", response));
  }

  getCurrentUserProfile() {
    return this.http.get<Profile>(`${this.apiUrl}/users/${this.currentUserSig()?.id}`);
  }
}
