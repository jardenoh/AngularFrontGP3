import { TestBed } from '@angular/core/testing';
import { BuildsComponent } from './builds.component'; // Changed to BuildsComponent

describe('BuildsComponent', () => {
  let component: BuildsComponent; // Changed to BuildsComponent
  let fixture;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildsComponent ]  // Changed to BuildsComponent
    }).compileComponents();

    fixture = TestBed.createComponent(BuildsComponent); // Changed to BuildsComponent
    component = fixture.componentInstance; 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
