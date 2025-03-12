import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';  // Import the SearchbarComponent

@Component({
  selector: 'app-home',
  standalone: true,  // Mark as standalone component
  imports: [SearchbarComponent],  // Include SearchbarComponent in imports
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  // Home component logic
}
