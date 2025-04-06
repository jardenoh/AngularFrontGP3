import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-builds',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.css']
})
export class BuildsComponent implements OnInit {
  searchTerm: string = '';
  typedText: string = '';
  typedResponse: string = '';
  typedDescription: string = '';

  showTyping: boolean = true;
  showDescriptionTyping: boolean = false;
  showParts: boolean = false;
  showSummary: boolean = false;

  responseMessage: string = "Great, based off of your needs, let's start picking your CPU! Click to continue.";
  typingSpeed: number = 55;
  currentPart: string = '';

  descriptionDone: boolean = false;
  backendDone: boolean = false;

  partIndex: number = 0;

  pcParts = [
    { name: 'CPU', description: 'The CPU (Central Processing Unit) is the brain of your computer. It performs calculations, runs programs, and determines how fast and powerful your system feels.' },
    { name: 'Motherboard', description: 'The motherboard connects all the components of your PC and determines what upgrades and features are supported.' },
    { name: 'Memory (RAM)', description: 'RAM temporarily stores data your PC is actively using. More RAM allows for smoother multitasking and faster performance.' },
    { name: 'Storage (HDD/SSD)', description: 'Storage is where your files, games, and operating system live. SSDs are much faster than traditional hard drives.' },
    { name: 'GPU', description: 'The GPU (Graphics Processing Unit) is responsible for rendering visuals, running games, and handling graphical workloads.' },
    { name: 'Power Supply Unit (PSU)', description: 'The PSU provides power to all components and ensures safe and efficient energy delivery.' },
    { name: 'Cooling System (Fans, Heatsinks)', description: 'Cooling solutions keep your PC from overheating and help maintain peak performance.' },
  ];

  selectedParts: { [key: string]: any } = {
    CPU: null,
    Motherboard: null,
    RAM: null,
    Storage: null,
    GPU: null,
    PSU: null,
    CPUCooler: null
  };

  results: { [partName: string]: any[] } = {};
  awaitingResponse: Set<string> = new Set<string>();

  backendKeys: { [displayName: string]: string } = {
    'CPU': 'cpu',
    'Motherboard': 'motherboard',
    'Memory (RAM)': 'ram',
    'Storage (HDD/SSD)': 'storage',
    'GPU': 'gpu',
    'Power Supply Unit (PSU)': 'psu',
    'Cooling System (Fans, Heatsinks)': 'cpucooler',
    'CPU Cooler': 'cpucooler',
    'Memory': 'ram',
    'Power Supply': 'psu',
    'CPU Cooling': 'cpucooler'
  };

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
    this.route.queryParams.subscribe(params => {
      const rawSearch = params['search'] || '';
      this.searchTerm = rawSearch;
      this.startTypingSearch();
    });
  }

  startTypingSearch() {
    let i = 0;
    this.typedText = '';
    this.typedResponse = '';

    const typeSearch = () => {
      if (i < this.searchTerm.length) {
        this.typedText += this.searchTerm.charAt(i);
        i++;
        setTimeout(typeSearch, this.typingSpeed);
      } else {
        setTimeout(() => this.startTypingResponse(), 500);
      }
    };

    typeSearch();
  }

  startTypingResponse() {
    let j = 0;
    const message = this.responseMessage;
    const typeResponse = () => {
      if (j < message.length) {
        this.typedResponse += message.charAt(j);
        j++;
        setTimeout(typeResponse, this.typingSpeed);
      }
    };

    typeResponse();
  }

  onBoxClick() {
    if (!this.showParts && !this.showDescriptionTyping) {
      this.showTyping = false;
      this.startPartFlow();
    }
  }

  startPartFlow() {
    const part = this.pcParts[this.partIndex];
    if (!part) return;

    this.currentPart = part.name;
    this.typedDescription = '';
    this.showDescriptionTyping = true;
    this.showParts = false;
    this.descriptionDone = false;
    this.backendDone = false;

    this.startTypingDescription(part.description);
    this.onPartClick(part);
  }

  startTypingDescription(text: string) {
    let k = 0;
    this.typedDescription = '';

    const typeDesc = () => {
      if (k < text.length) {
        this.typedDescription += text.charAt(k);
        k++;
        setTimeout(typeDesc, this.typingSpeed);
      } else {
        this.descriptionDone = true;
        this.tryShowParts();
      }
    };

    typeDesc();
  }

  onPartClick(part: any): void {
    if (this.awaitingResponse.has(part.name)) return;

    this.awaitingResponse.add(part.name);
    const payload = {
      query: this.searchTerm,
      component: this.backendKeys[part.name]
    };

    const url = 'http://localhost:8000/api/pc-parts/';

    this.http.post(url, payload).subscribe({
      next: (response: any) => {
        const backendKey = this.backendKeys[part.name] || part.name.toLowerCase();
        let partResults =
          response.components[backendKey] ||
          response.components[part.name] ||
          response.components[backendKey.toUpperCase()] ||
          response.components['CPU Cooler'] ||
          [];

        if (!Array.isArray(partResults)) {
          partResults = Object.values(partResults);
        }

        this.results[part.name] = partResults.slice(0, 2);
        this.awaitingResponse.delete(part.name);
        this.backendDone = true;
        this.tryShowParts();
      },
      error: (error) => {
        console.error('Error:', error);
        this.awaitingResponse.delete(part.name);
        this.backendDone = true;
        this.tryShowParts();
      }
    });
  }

  tryShowParts(): void {
    if (this.backendDone && this.descriptionDone) {
      setTimeout(() => {
        this.showDescriptionTyping = false;
        this.showParts = true;
      }, 1000);
    }
  }

  selectPart(partName: string, selectedComponent: any): void {
    this.selectedParts[partName] = selectedComponent;
    console.log('✅ Selected part saved:', partName, selectedComponent);
    console.log('📦 Current selections:', this.selectedParts);

    const payload = {
      component: this.backendKeys[partName],
      selectedComponent
    };

    const url = 'http://localhost:8000/api/selected-part/';

    this.http.post(url, payload).subscribe({
      next: (res) => {
        console.log('Selected sent to backend:', res);
        this.advanceToNextPart();
      },
      error: (err) => {
        console.error('Selection error:', err);
        this.advanceToNextPart();
      }
    });
  }

  advanceToNextPart() {
    this.partIndex++;
    if (this.partIndex < this.pcParts.length) {
      setTimeout(() => this.startPartFlow(), 500);
    } else {
      console.log('🎉 Build complete! Final selections:', this.selectedParts);
      this.showParts = false;
      this.showSummary = true;
    }
  }
}