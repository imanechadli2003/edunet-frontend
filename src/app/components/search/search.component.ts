import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Topic } from '../../shared/data/topic';
import {User} from "../../shared/data/user";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  topicSearchResults: Topic[] = [];

  userSearchResults: User[] = [];

  searchType: string = "t";

  query: string = "";

  constructor(private route: ActivatedRoute, private searchService: SearchService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      if (this.query) {
        const parts = this.query.split('#');
        this.query = parts[0];
        this.searchType = 't';
        if (parts.length > 1) {
          this.searchType = parts[1];
        }
        console.log("query = ", this.query, " type = ", this.searchType);
        if (this.searchType === 'u') {
          this.searchService.searchUsers(this.query).subscribe(
            (response) => {
              this.userSearchResults = response;
            });
        } else {
          this.searchService.searchTopics(this.query).subscribe((response) => {
            this.topicSearchResults = response
          });
        }
      }
    });
  }
}
