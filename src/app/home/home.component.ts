import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { SearchbarComponent } from '../searchbar/searchbar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  showIntro = false;
  currentLine = 1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    const alreadySeen = sessionStorage.getItem('seenIntro');

    if (this.router.url === '/' && !alreadySeen) {
      this.showIntro = true;

      setTimeout(() => {
        this.currentLine = 0;
      }, 1800);

      setTimeout(() => {
        this.currentLine = 2;
      }, 2100);

      setTimeout(() => {
        this.showIntro = false;
        sessionStorage.setItem('seenIntro', 'true');
        this.runScaleFix(); // ✅ run scale after intro
      }, 4000);
    } else {
      this.showIntro = false;
      this.runScaleFix(); // ✅ run scale if no intro
    }
  }

  scrollToFAQ(): void {
    this.router.navigate(['/faq']);
  }

  private runScaleFix(): void {
    setTimeout(() => {
      const scaleUpdate = (window as any).updateScale;
      if (typeof scaleUpdate === 'function') {
        scaleUpdate();
      }
    }, 0);
  }
}
