import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuildsComponent } from './builds/builds.component'; // Correct import

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'builds', component: BuildsComponent },  // Updated to reflect BuildsComponent
  { path: '**', redirectTo: '' },
];
