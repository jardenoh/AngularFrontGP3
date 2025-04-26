import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BuildsComponent } from './builds/builds.component';
import { TeamComponent } from './team/team.component';
import { FaqComponent } from './faq/faq.component'; // 

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'builds', component: BuildsComponent },
  { path: 'team', component: TeamComponent },
  { path: 'faq', component: FaqComponent },       // 
  { path: '**', redirectTo: '' },
];
