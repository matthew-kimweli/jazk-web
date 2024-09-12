import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from "../../_components/header/header.component";

@Component({
  selector: 'app-motor-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './motor-payment-success.component.html',
  styleUrl: './motor-payment-success.component.css'
})
export class MotorPaymentSuccessComponent {

  reference = Date.now()
}
