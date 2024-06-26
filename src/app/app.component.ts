import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './shared/data/user';
import {API_BASE_URL} from "../../config";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet, CommonModule, ReactiveFormsModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  title = 'Edunet';

  userService = inject(UserService);

  http = inject(HttpClient);

  router = inject(Router);

  searchForm: FormGroup;

  constructor(fb: FormBuilder) {
    this.searchForm = fb.group({
      search: ['', Validators.required],
    })

  }

  ngOnInit(): void {
    this.http.get<User>(`${API_BASE_URL}/auth/user`)
      .subscribe(
        (user) => {
          console.log("authentication check response: ", user);
          this.userService.currentUserSig.set(user);
          this.router.navigateByUrl(`/profile/${user.id}`);
        },
        (error) => {
          console.log("User not authenticated: ", error);
          this.router.navigateByUrl('/welcome');
        }
      );
  }

  search(): void {
    const word = this.searchForm.getRawValue().search;
    this.router.navigate(['/search'], { queryParams: { q: word } });
  }

  logout() {
    this.userService.logout();
    this.router.navigateByUrl("/");
  }
}
