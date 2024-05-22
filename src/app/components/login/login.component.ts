import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  rtr: Router;

  constructor(private userService: UserService, private fb: FormBuilder, rtr: Router) {
    this.rtr = rtr;
    this.loginForm = fb.group({
      handle: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("form submitted");
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.getRawValue()).subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.rtr.navigateByUrl('/');
        } else {
          console.log('Login failed due to unauthorized error or other issues.');
        }
      });
    } else {
      console.log(this.loginForm.errors);
    }
  }
}
