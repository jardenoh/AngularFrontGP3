import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule

@Component({
  selector: 'app-builds',
  standalone: true,
  imports: [CommonModule], // Add CommonModule here
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {
  searchTerm: string = '';

  // PC parts sections
  pcParts = [
    { name: 'CPU', description: 'The brain of the computer that executes instructions and processes data.' },
    { name: 'Motherboard', description: 'The main circuit board that connects all components of the PC.' },
    { name: 'Memory (RAM)', description: 'Temporary storage that the CPU uses to store and quickly access data.' },
    { name: 'Storage (HDD/SSD)', description: 'Long-term storage for the operating system, programs, and files.' },
    { name: 'GPU', description: 'Handles rendering images, video, and animations, typically used for gaming or professional graphics work.' },
    { name: 'Power Supply Unit (PSU)', description: 'Converts electricity from the outlet into the necessary power for the computer.' },
    { name: 'Cooling System (Fans, Heatsinks)', description: 'Keeps the PC components, especially the CPU and GPU, at safe operating temperatures.' },
    { name: 'Case (Chassis)', description: 'Encloses and protects all the internal components.' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the search term from the query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || ''; // Set search term from query params
    });
  }
}
