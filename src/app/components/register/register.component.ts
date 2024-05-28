import { CommonModule } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import {BranchService} from "../../services/branch.service";
import {Branch} from "../../shared/data/branch";


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  rtr: Router;

  branchService = inject(BranchService);

  branchList: Branch[] = [];

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

  ngOnInit(): void {
    this.branchService.getBranches().subscribe(
      (res: Branch[]) => {
        this.branchList = res;
      }
    )
  }
}
