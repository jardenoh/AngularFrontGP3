import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [FormsModule], // Include FormsModule in imports
  template: `
    <div class="searchbar">
      <input 
        [(ngModel)]="searchTerm" 
        placeholder="Search..." 
        (keyup.enter)="onSearch()" 
        class="input" />
      <button (click)="onSearch()" class="search-button">
        Search
      </button>
    </div>
  `,
  styleUrls: ['./searchbar.component.css']
})
export class SearchbarComponent {
  searchTerm: string = ''; // Store search term

  constructor(private router: Router) {}

  onSearch() {
    if (this.searchTerm) {
      // Navigate to build page with search term as a query parameter
      this.router.navigate(['/builds'], { queryParams: { search: this.searchTerm } });
    }
  }
}
