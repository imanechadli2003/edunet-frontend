import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SearchService } from '../../services/search.service';
import { Topic } from '../../shared/data/topic';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchResults: Topic[] = [];
  query: string = "";

  constructor(private route: ActivatedRoute, private searchService: SearchService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.query = params['q'];
      if (this.query) {
        this.searchService.search(this.query).subscribe(
          (response) => { this.searchResults = response; }
        );
      }
    });
  }
}
