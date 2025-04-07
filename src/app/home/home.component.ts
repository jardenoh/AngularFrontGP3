import { Component } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  images: string[] = [
    'assets/gpu.png',
    'assets/cpu.png',
    'assets/motherboard.png',
    'assets/ram.png',
    'assets/storage.png',
    'assets/psu.png',
    'assets/cooler.png'
  ];

  currentIndex: number = 0;

  constructor() {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // rotate every 3 seconds
  }
}
