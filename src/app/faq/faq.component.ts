import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-faq',
  standalone: true,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  imports: [NgIf, NgFor]
})
export class FaqComponent {
  beginnerFaqs = [
    {
      question: "What parts do I need to build a PC?",
      answer: "You'll need a CPU, motherboard, RAM, storage, power supply, case, and (optionally) a GPU and cooling system.",
      open: false
    },
    {
      question: "How do I make sure my parts are compatible?",
      answer: "Check CPU socket compatibility with the motherboard, RAM support, case size (ATX/mATX/ITX), and PSU wattage for your build.",
      open: false
    },
    {
      question: "What tools do I need to build a PC?",
      answer: "A basic Phillips screwdriver is enough for most builds. An anti-static wrist strap is recommended but not mandatory.",
      open: false
    },
    {
      question: "Do I need thermal paste?",
      answer: "Yes, thermal paste helps transfer heat from the CPU to the cooler. Many coolers come with pre-applied paste.",
      open: false
    },
    {
      question: "Is it hard to build a PC?",
      answer: "With patience and research, most people can build a PC. Watching step-by-step video guides is highly recommended.",
      open: false
    }
  ];

  intermediateFaqs = [
    {
      question: "How do I apply thermal paste correctly?",
      answer: "Apply a small pea-sized amount to the center of the CPU, then let the cooler spread it naturally when mounted.",
      open: false
    },
    {
      question: "How should I manage airflow in my case?",
      answer: "Balance intake and exhaust fans. Typically have slightly more intake fans to create positive pressure and reduce dust.",
      open: false
    },
    {
      question: "Should I get a modular or non-modular power supply?",
      answer: "Modular PSUs allow you to connect only the cables you need, improving airflow and cable management.",
      open: false
    },
    {
      question: "How can I tell if my motherboard fits my case?",
      answer: "Check the case specs. ATX, micro-ATX, and mini-ITX are common motherboard sizes that cases usually support.",
      open: false
    },
    {
      question: "How do I install Windows on a new PC?",
      answer: "Create a bootable USB drive with Windows installation media, plug it in, and set it as the boot device in BIOS.",
      open: false
    }
  ];

  advancedFaqs = [
    {
      question: "What BIOS settings should I change after building?",
      answer: "Enable XMP for RAM speed, set boot priority, and optionally tweak fan curves or enable secure boot.",
      open: false
    },
    {
      question: "How can I optimize XMP profiles and memory timings?",
      answer: "Manually adjusting memory voltages and tightening timings can improve performance, but requires stress testing for stability.",
      open: false
    },
    {
      question: "What should I do if my PC doesn't boot after building?",
      answer: "Check power connections, RAM seating, CPU cooler installation, and troubleshoot beep codes or motherboard debug LEDs.",
      open: false
    },
    {
      question: "How important is BIOS updating?",
      answer: "BIOS updates can improve CPU support, memory compatibility, and system stability, but should be done carefully.",
      open: false
    },
    {
      question: "How do I undervolt my CPU or GPU?",
      answer: "Undervolting reduces power consumption and heat. Use BIOS settings (CPU) or MSI Afterburner (GPU) with stability testing.",
      open: false
    }
  ];

  constructor(private router: Router) {}

  toggleFAQ(faqList: 'beginner' | 'intermediate' | 'advanced', index: number): void {
    if (faqList === 'beginner') {
      this.beginnerFaqs[index].open = !this.beginnerFaqs[index].open;
    } else if (faqList === 'intermediate') {
      this.intermediateFaqs[index].open = !this.intermediateFaqs[index].open;
    } else if (faqList === 'advanced') {
      this.advancedFaqs[index].open = !this.advancedFaqs[index].open;
    }
  }

  navigateHome(): void {
    this.router.navigateByUrl('/');
  }
}
