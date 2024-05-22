import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserService } from './services/user.service';
import { User } from './shared/data/user';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  
  title = 'Edunet';

userService = inject(UserService);

  http = inject(HttpClient);

  router = inject(Router);

  ngOnInit(): void {
    this.http.get<User>("http://localhost:10000/api/auth/user")
      .subscribe(
        (user) => {
          console.log("authentication check response: ", user);
          this.userService.currentUserSig.set(user);
          this.router.navigateByUrl('/'); 
        },
        (error) => {
          console.log("User not authenticated: ", error);
          this.router.navigateByUrl('/login');
        }
      );
  }
}
