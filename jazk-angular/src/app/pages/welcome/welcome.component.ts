import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../_components/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  constructor(private router: Router) {}

  insuranceTypes = [
    {
      title: 'Buy Motor Insurance',
      description: `Get compensation for costs incurred following a motor
                    accident, whether it's a car, truck, motorcycle, or any road
                    vehicle with extensive coverage options, including
                    third-party liability, damage and more.`,
      buttonText: 'Insure your motor vehicle',
      // buttonLink: '/motor',
      isActive: true,
      buttons: [
        {text: 'New Insurance', buttonLink:'/motor'},
        {text: 'Renew', buttonLink:'https://digilab.jubilee-allianz.com/motor/renew'}
      ]
    },
    {
      title: 'Travel Insurance',
      description: `You can purchase a single trip cover for every travel or an annual cover to cover all the trips within a 12-month period. Get protected against unforeseen medical expenses, trip cancellations, or delays.`,
      buttonText: 'Get your travel insurance',
      buttonLink: 'https://travel.jubilee-allianz.com/',
      isActive: false,
    },
    {
      title: 'Home Insurance',
      description: `Protect Your Home: Get coverage for your
                    home against damages or losses caused by fire, theft,
                    natural disasters, and other unforeseen events. Ensure your
                    peace of mind with comprehensive home insurance.`,
      buttonText: 'Coming Soon',
      buttonLink: '/home',
      isActive: false,
    },
    {
      title: 'Personal Accident',
      description: `Stay Covered Against Accidents: Receive
                    financial support for medical expenses, disability, or loss
                    of income due to accidents. Protect yourself and your loved
                    ones with comprehensive Personal Accident Insurance.`,
      buttonText: 'Coming Soon',
      buttonLink: '/personal-accident',
      isActive: false,
    },
    {
      title: 'SME',
      description: `Safeguard Your Business: Protect your SME against risks like property damage,
                    liability, and business interruption. Ensure your business's
                    continuity with tailored SME Insurance.`,
      buttonText: 'Coming Soon',
      buttonLink: '/sme',
      isActive: false,
    },
    {
      title: 'WIBA',
      description: `Secure Your Workforce: Provide essential protection for your employees against workplace injuries, illnesses, and accidents. Comply with regulations and ensure their well-being with WIBA Insurance.`,
      buttonText: 'Coming Soon',
      buttonLink: '/wiba',
      isActive: false,
    },
    {
      title: 'Marine',
      description: `Navigate with Confidence: Protect your cargo, vessels, and maritime assets against risks at sea, including loss, damage, and piracy. Sail safely with comprehensive Marine Insurance.`,
      buttonText: 'Coming Soon',
      buttonLink: '/marine',
      isActive: false,
    },
  ];

  isMobile() {
    return window.innerWidth <= 768; // Adjust the width based on your breakpoint
  }

  gotoLink(item:any) {
    if (item.buttonLink.startsWith('http')) {
      window.location.href = item.buttonLink;
    } else {
      this.router.navigate([item.buttonLink]);
    }
  }

  
}
