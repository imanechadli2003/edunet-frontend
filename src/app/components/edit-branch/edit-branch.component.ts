import {Component, inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Branch} from "../../shared/data/branch";
import {BranchService} from "../../services/branch.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-branch',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './edit-branch.component.html',
  styleUrl: './edit-branch.component.css'
})
export class EditBranchComponent {

  branch!: Branch;

  editForm: FormGroup;

  router: Router = inject(Router);

  id!: number;

  branchService = inject(BranchService);

  constructor(fb: FormBuilder, route: ActivatedRoute) {
    // @ts-ignore
    this.id = route.snapshot.paramMap.get("id");
    this.editForm = fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnChanges() {
    if (this.branch) {
      this.editForm.patchValue({
        name: this.branch.name,
        description: this.branch.description
      });
    }
  }

  onSubmit() {
    if (this.editForm.valid) {
      this.branchService.save(this.id, this.editForm.getRawValue()).subscribe(
        response => {
          console.log("branch created")
          this.router.navigateByUrl('/branch-list');
        }, error => {
          console.log(error);
        });
    }
  }
}
