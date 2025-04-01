import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';  // Import CommonModule
import { HttpClient } from '@angular/common/http';
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

  results: {[partName:string]: any[]} = {};
  awaitingResponse: Set<string> = new Set<string>();

  // had issues with memory, storage, power supply, and cooling system component 
  // because the part.name does not match backend name for these components
  // needed to map each component to a name so that it can correctly be sent to backend
  backendKeys: { [displayName: string]: string } = {
    'CPU': 'cpu',
    'Motherboard': 'motherboard',
    'Memory (RAM)': 'ram',
    'Storage (HDD/SSD)': 'storage',
    'GPU': 'gpu',
    'Power Supply Unit (PSU)': 'psu',
    'Cooling System (Fans, Heatsinks)': 'cpucooler'
  };

  // list of fields of each component to be used to display in the html code
  displayFields: { [partName: string]: string[] } = {
    'CPU': ['name', 'price', 'core_count', 'core_clock', 'boost_clock'],
    'Motherboard': ['name', 'price', 'socket', 'form_factor', 'memory_slots', 'max_memory'],
    'Memory (RAM)': ['name', 'price', 'speed', 'modules', 'price_per_gb'],
    'Storage (HDD/SSD)': ['name', 'price', 'capacity', 'form_factor', 'interface', 'type'],
    'GPU': ['name', 'price', 'chipset', 'memory', 'core_clock', 'boost_clock', 'length'],
    'Power Supply Unit (PSU)': ['name', 'price', 'type', 'wattage', 'efficiency', 'modular'],
    'Cooling System (Fans, Heatsinks)': ['name', 'price', 'rpm', 'noise_level', 'size'],
  };
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Get the search term from the query params
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || ''; // Set search term from query params
    });
  }

  onPartClick(part: any): void {
    // Prevent duplicate requests for the same part
    if (this.awaitingResponse.has(part.name)) {
      return;
    }
    // adds this part to awaitingResponse to trigger the spinner for this component
    this.awaitingResponse.add(part.name);

    // create payload of user query & component that is being requested
    const payload = {
      query: this.searchTerm,
      component: this.backendKeys[part.name]
    };

    // Web console debugging
    console.log('Clicked part:', payload);
    const url = 'http://localhost:8000/api/pc-parts/';

    // Make a post request to django backend
    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        console.log('Response from backend', response);
        // use the mapped name of requested component so that angular can correctly parse it
        const backendKey = this.backendKeys[part.name] || part.name.toLowerCase();

        //  grabs the components it received and convert it into an array of object components
        let partResults = response.components[backendKey];

        // checks if response is empty
        if (!partResults) {
          partResults = [];
        } 
        
        // converts the attributes of object returned into elements in an array
        // ex.  "0": { "name": "Intel Core i5", ... },
        //      "1": { "name": "AMD Ryzen 5", ... }
        else if (!Array.isArray(partResults)) {
          partResults = Object.values(partResults);
        }

        // stores the results into the associated part
        this.results[part.name] = partResults;

        // disables loading spinner
        this.awaitingResponse.delete(part.name);
      },
      error: (error) => {
        console.error('Error sending to backend', error);
        this.awaitingResponse.delete(part.name);
      }
    });
  }
}
