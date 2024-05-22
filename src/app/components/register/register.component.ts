import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  
  registerForm: FormGroup;

  rtr: Router;
  
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {
    this.rtr = router;
    this.registerForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      handle: ['', Validators.required],
      email: ['', Validators.required],
      branch: ['', Validators.required],
      password: ['', Validators.required],
      gender: ['', Validators.required],
      title: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    console.log("form submitted ", this.registerForm.getRawValue());
    if (this.registerForm.valid) {
      this.userService.register(this.registerForm.getRawValue());
      this.rtr.navigateByUrl("/login");
    } else {
      console.log(this.registerForm.errors);
    }
  }
}
