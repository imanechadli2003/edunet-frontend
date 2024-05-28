import {Component, inject} from '@angular/core';
import {Branch} from "../../shared/data/branch";
import {BranchService} from "../../services/branch.service";
import {CommonModule} from "@angular/common";
import {BranchComponent} from "../branch/branch.component";
import {RouterLink} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-branch-list',
  standalone: true,
  imports: [CommonModule, BranchComponent, RouterLink],
  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.css'
})
export class BranchListComponent {

  branches: Branch[] = [];

  branchService = inject(BranchService);

  userService = inject(UserService);

  constructor() {}

  ngOnInit(): void {
    this.fetchBranches();
  }

  fetchBranches(): void {
    this.branchService.getBranches().subscribe(
      (branches: Branch[]) => {
        this.branches = branches;
      },
      (error: any) => {
        console.error('Error fetching branches:', error);
      }
    );
  }
}
