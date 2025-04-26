import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'optimal';

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.applyScaling(); // Apply scaling on route change
      }
    });
  }

  applyScaling() {
    const baseWidth = 1920;
    const baseHeight = 1080;
    const scale = Math.min(window.innerWidth / baseWidth, window.innerHeight / baseHeight);
    const offsetX = (window.innerWidth - baseWidth * scale) / 2;
    const offsetY = (window.innerHeight - baseHeight * scale) / 2;

    const wrapper = document.getElementById('scale-wrapper');
    if (wrapper) {
      wrapper.style.transform = `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
    }
  }
}
