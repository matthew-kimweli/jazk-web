import { Component } from '@angular/core';
import { HeaderComponent } from "../../_components/header/header.component";
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './view-quote.component.html',
  styleUrl: './view-quote.component.css'
})
export class ViewQuoteComponent {
  vehicle = {
    makeModel: 'Toyota Corolla',
    year: 2019,
    registration: 'KAA 123A'
  };

  insurance = {
    coverageType: 'Comprehensive',
    premium: 45000,
    excess: 2.5,
    totalCost: 45000 // Assuming no additional charges
  };

  constructor(private router: Router){

  }

  purchase() {
    
    this.router.navigate(['motor-kyc'])
  }

  goBack() {
    history.back()
  }
}
