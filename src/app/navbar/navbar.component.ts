import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuOpen = false;

  @ViewChild('popoutRef') popoutRef?: ElementRef;
  @ViewChild('hamburgerRef') hamburgerRef?: ElementRef;

  constructor(private router: Router) {}

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;

    if (this.menuOpen) {
      setTimeout(() => {
        document.addEventListener('click', this.handleOutsideClick);
      });
    } else {
      document.removeEventListener('click', this.handleOutsideClick);
    }
  }

  navigateTo(route: string): void {
    this.router.navigateByUrl(route);
    this.menuOpen = false; // Close menu after navigation
    document.removeEventListener('click', this.handleOutsideClick);
  }

  handleOutsideClick = (event: MouseEvent): void => {
    const popoutEl = this.popoutRef?.nativeElement;
    const hamburgerEl = this.hamburgerRef?.nativeElement;

    const clickedInsidePopout = popoutEl?.contains(event.target);
    const clickedHamburger = hamburgerEl?.contains(event.target);

    if (!clickedInsidePopout && !clickedHamburger) {
      this.menuOpen = false;
      document.removeEventListener('click', this.handleOutsideClick);
    }
  };
}
