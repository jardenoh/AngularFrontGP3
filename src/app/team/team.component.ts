import { Component } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-team',
  standalone: true,
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css'],
  imports: [NgIf, NgFor]
})
export class TeamComponent {
  selectedMember: any = null;

  teamMembers = [
    {
      name: 'John Du',
      role: 'Computer Science',
      email: 'c00515775@louisiana.edu',
      description: 'Worked on back-end development of the project as well as database management and debugging.',
      image: 'assets/john.png'
    },
    {
      name: 'Brennan Callegan',
      role: 'Computer Science',
      email: 'c00437646@louisiana.edu',
      description: 'Created the AI search bar as well as Front-End and back-end development.',
      image: 'assets/brennan.png'
    },
    {
      name: 'Philip Ravain',
      role: 'Informatics',
      email: 'c00490330@louisiana.edu',
      description: 'Handled project documentation and user experience improvements as well as scrum master duties.',
      image: 'assets/philip.png'
    },
    {
      name: 'Isaiah Zachery',
      role: 'Computer Science',
      email: 'c00445203@louisiana.edu',
      description: 'Developed backend Big Query system and database management.',
      image: 'assets/isaiah.png'
    },
    {
      name: 'Jared Ardenaux',
      role: 'Informatics',
      email: 'c00513833@louisiana.edu',
      description: 'Worked on UI design, website design, layout structuring, and team coordination.',
      image: 'assets/jared.png'
    },
    {
      name: 'Luke Theriot',
      role: 'Informatics',
      email: 'c00529772@louisiana.edu',
      description: 'Assisted with project research and feature testing as well as back end and front end assistance.',
      image: 'assets/luke.png'
    }
  ];

  selectMember(member: any) {
    this.selectedMember = member;
  }

  closeOverlay() {
    this.selectedMember = null;
  }
}
