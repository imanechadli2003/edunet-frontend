import {Component, inject, Input} from '@angular/core';
import {Branch} from "../../shared/data/branch";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {BranchService} from "../../services/branch.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-branch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './branch.component.html',
  styleUrl: './branch.component.css'
})
export class BranchComponent {

  @Input() branch!: Branch;

  isAdmin: boolean = false;

  userService = inject(UserService);

  router = inject(Router);

  branchService = inject(BranchService);

  constructor() {}

  ngOnInit(): void {
    this.isAdmin = this.userService.isAdmin();
  }

  editBranch(): void {
    this.router.navigate(['/edit-branch', this.branch.id]);
  }

}
