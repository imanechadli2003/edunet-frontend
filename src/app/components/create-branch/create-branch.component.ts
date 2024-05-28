import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {BranchService} from "../../services/branch.service";

@Component({
  selector: 'app-create-branch',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './create-branch.component.html',
  styleUrl: './create-branch.component.css'
})
export class CreateBranchComponent {

  branchForm: FormGroup;

  router = inject(Router);

  branchService = inject(BranchService);

  constructor(fb: FormBuilder) {
    this.branchForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      this.branchService.createBranch(this.branchForm.getRawValue()).subscribe(
        response => {
          this.router.navigateByUrl('/branch-list');
        }
      );
    } else {
      console.log('Invalid form');
    }
  }
}
