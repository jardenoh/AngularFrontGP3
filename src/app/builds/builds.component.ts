import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class BuildsComponent implements OnInit, OnDestroy {
  searchTerm = '';
  typedText = '';
  typedResponse = '';
  typedDescription = '';

  showTyping = true;
  showDescriptionTyping = false;
  showParts = false;
  showSummary = false;
  readyToSelect = false;

  responseMessage = "Great, based off of your needs, let's start picking your CPU! Click to continue.";
  currentPart = '';
  partIndex = 0;

  awaitingResponse = new Set<string>();
  loadingDots = '';
  private dotsInterval: any;

  pcParts = [
    { name: 'CPU', description: 'The CPU (Central Processing Unit) is the brain of your computer...' },
    { name: 'Motherboard', description: 'The motherboard connects all the components of your PC...' },
    { name: 'Memory (RAM)', description: 'RAM temporarily stores data your PC is actively using...' },
    { name: 'Storage (HDD/SSD)', description: 'Storage is where your files, games, and OS live...' },
    { name: 'GPU', description: 'The GPU renders visuals and handles graphics workloads...' },
    { name: 'Power Supply Unit (PSU)', description: 'The PSU provides power to all components...' },
    { name: 'Cooling System (Fans, Heatsinks)', description: 'Cooling solutions keep your PC from overheating...' }
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
  backendKeys: { [name: string]: string } = {
    CPU: 'cpu',
    Motherboard: 'motherboard',
    'Memory (RAM)': 'ram',
    'Storage (HDD/SSD)': 'storage',
    GPU: 'gpu',
    'Power Supply Unit (PSU)': 'psu',
    'Cooling System (Fans, Heatsinks)': 'cpucooler',
    'CPU Cooler': 'cpucooler'
  };

  displayFields: { [partName: string]: string[] } = {
    CPU: ['name','price','core_count','core_clock','boost_clock'],
    Motherboard: ['name','price','socket','form_factor','memory_slots','max_memory'],
    'Memory (RAM)': ['name','price','speed','modules','price_per_gb'],
    'Storage (HDD/SSD)': ['name','price','capacity','form_factor','interface','type'],
    GPU: ['name','price','chipset','memory','core_clock','boost_clock','length'],
    'Power Supply Unit (PSU)': ['name','price','type','wattage','efficiency','modular'],
    'Cooling System (Fans, Heatsinks)': ['name','price','rpm','noise_level','size']
  };

  amazonCartLink = '';

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['search'] || '';
      this.typedText = this.searchTerm;
      this.typedResponse = this.responseMessage;
    });
    this.startDotsAnimation();
  }

  ngOnDestroy() {
    clearInterval(this.dotsInterval);
  }

  isLoading(): boolean {
    return this.awaitingResponse.size > 0;
  }

  private startDotsAnimation() {
    let count = 0;
    this.dotsInterval = setInterval(() => {
      if (this.isLoading()) {
        count = (count + 1) % 4;
        this.loadingDots = '.'.repeat(count);
      } else {
        this.loadingDots = '';
      }
    }, 500);
  }

  onBoxClick() {
    if (!this.showDescriptionTyping && !this.showParts) {
      this.showTyping = false;
      this.showDescriptionTyping = true;
      this.fetchCurrentPart();
    }
  }

  private fetchCurrentPart() {
    const part = this.pcParts[this.partIndex];
    this.currentPart = part.name;
    this.typedDescription = part.description;
    this.awaitingResponse.add(part.name);

    this.http.post('http://localhost:8000/api/pc-parts/', {
      query: this.searchTerm,
      component: this.backendKeys[part.name]
    }).subscribe((response: any) => {
      const backendKey = this.backendKeys[part.name] || part.name.toLowerCase();
      let partResults =
        response.components?.[backendKey] ||
        response.components?.[part.name] ||
        response.components?.[backendKey.toUpperCase()] ||
        response.components?.['CPU Cooler'] ||
        [];

      if (!Array.isArray(partResults)) {
        partResults = Object.values(partResults);
      }

      console.log('🔧 Part:', part.name, '| Backend Key:', backendKey);
      console.log('📦 Raw Response:', response);
      console.log('✅ Results Stored:', partResults);

      this.results[part.name] = partResults.slice(0, 2);
      this.awaitingResponse.delete(part.name);
      this.readyToSelect = true;
    }, (error) => {
      console.error('❌ Error fetching part:', part.name, error);
      this.results[part.name] = [];
      this.awaitingResponse.delete(part.name);
      this.readyToSelect = true;
    });
  }

  onSelectPartsClick() {
    this.showDescriptionTyping = false;
    this.showParts = true;
    this.readyToSelect = false;
  }

  selectPart(partName: string, item: any) {
    this.selectedParts[partName] = item;
    this.http.post('http://localhost:8000/api/selected-part/', {
      component: this.backendKeys[partName],
      selectedComponent: item
    }).subscribe(
      () => this.advanceToNextPart(),
      () => this.advanceToNextPart()
    );
  }

  private advanceToNextPart() {
    this.partIndex++;
    if (this.partIndex < this.pcParts.length) {
      setTimeout(() => {
        this.showDescriptionTyping = true;
        this.showParts = false;
        this.fetchCurrentPart();
      }, 500);
    } else {
      this.showParts = false;
      this.showSummary = true;
      this.buildAmazonCartLink();
    }
  }

  private buildAmazonCartLink() {
    let link = 'https://www.amazon.com/gp/aws/cart/add.html?';
    let idx = 1;
    for (const name in this.selectedParts) {
      const p = this.selectedParts[name];
      if (p?.asin) {
        link += `ASIN.${idx}=${p.asin}&Quantity.${idx}=1&`;
        idx++;
      }
    }
    this.amazonCartLink = link.slice(0, -1);
  }
}
