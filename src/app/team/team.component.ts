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
      role: 'Computer Scientist',
      email: 'john@example.com',
      description: 'Worked on front-end development and search integration.'
    },
    {
      name: 'Brennan Callegan',
      role: 'Computer Scientist',
      email: 'brennan@example.com',
      description: 'Focused on database design and AI search logic.'
    },
    {
      name: 'Philip Ravain',
      role: 'Informatics',
      email: 'philip@example.com',
      description: 'Handled project documentation and user experience improvements.'
    },
    {
      name: 'Isaiah Zachery',
      role: 'Computer Scientist',
      email: 'isaiah@example.com',
      description: 'Developed backend APIs and ensured server-side stability.'
    },
    {
      name: 'Jared Ardenaux',
      role: 'Informatics',
      email: 'jared@example.com',
      description: 'Worked on UI design, layout structuring, and team coordination.',
      image: 'assets/jared.png'
    },
    {
      name: 'Luke Theriot',
      role: 'Informatics',
      email: 'luke@example.com',
      description: 'Assisted with project research and feature testing.'
    }
  ];

  selectMember(member: any) {
    this.selectedMember = member;
  }

  closeOverlay() {
    this.selectedMember = null;
  }
}
