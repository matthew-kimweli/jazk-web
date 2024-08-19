import { Component } from '@angular/core';
import { HeaderComponent } from '../../_components/header/header.component';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MotorService } from '../../../services/motor.service';

@Component({
  selector: 'app-view-quote',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HeaderComponent],
  templateUrl: './view-quote.component.html',
  styleUrl: './view-quote.component.css',
})
export class ViewQuoteComponent {

  insurance = {
    coverageType: 'Comprehensive',
    premium: 45000,
    totalCost: 45000,
    limits: {
      thirdPartyPropertyDamage: 500000,
      bodilyInjuryPerPerson: 1000000,
      bodilyInjuryPerAccident: 3000000,
    },
    excesses: {
      ownDamage: 2.5,
      theft: 5.0,
      windscreenDamage: 10.0,
    },
    benefits: {
      medicalExpenses: 100000,
    },
    enhancements: {
      windscreenCover: 20000,
      lossOfUse: 2000,
    },
  };
emailQuoteDetails: any = {};

  constructor(
    private router: Router,
    public motorService : MotorService,
  ) {}

  purchase() {
    this.router.navigate(['motor-kyc']);
  }

  downloadQuote() {}
  emailQuote() {}

  goBack() {
    history.back();
  }

}
