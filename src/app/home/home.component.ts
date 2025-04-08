import { Component, AfterViewInit, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { SearchbarComponent } from '../searchbar/searchbar.component';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchbarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
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

  @ViewChild('howItWorksSection') howItWorksSection!: ElementRef;

  private destroy$ = new Subject<void>();

  constructor(private route: ActivatedRoute, private router: Router) {
    setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // rotate every 3 seconds
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        // Scroll to top only if there is no fragment in the URL
        if (!this.route.snapshot.fragment) {
          window.scrollTo(0, 0);
        }
      });
  }

  ngAfterViewInit(): void {
    this.route.fragment
      .pipe(takeUntil(this.destroy$))
      .subscribe(fragment => {
        if (fragment === 'how-it-works' && this.howItWorksSection) {
          this.howItWorksSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}