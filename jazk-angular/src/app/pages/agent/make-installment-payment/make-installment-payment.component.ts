import { Component } from '@angular/core';
import { HeaderComponent } from '../../_components/header/header.component';
import { CommonModule } from '@angular/common';
import { ParseService } from '../../../services/parse.service';
import { SideMenuComponent } from '../../_components/side-menu/side-menu.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-make-installment-payment',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    SideMenuComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './make-installment-payment.component.html',
  styleUrl: './make-installment-payment.component.css',
})
export class MakeInstallmentPaymentComponent {
  totalAmount = 0; // Total amount owed
  paidInstallments = 0; // Total paid so far
  currentBalance = this.totalAmount - this.paidInstallments; // Calculate balance

  paymentForm: FormGroup;
  sale: any;

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public parseService: ParseService
  ) {
    this.paymentForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.max(this.currentBalance),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((parameter) => {
      let id = parameter['id'];

      if (id) {
        this.fetchSale(id);
      }
    });
  }

  async fetchSale(id: any) {
    try {
      console.log('fetching sale', id);
      this.parseService.fetching = true;
      let query = new Parse.Query('JazkeSale');
      query.include(['quotation']);
      let sale = await query.get(id);
      console.log('sale', sale);
      this.sale = sale;
      let installments = this.sale.get('installments') || []
      this.totalAmount = this.sale.get('amount') || 0
      this.paidInstallments = this.sale.get('paid_amount') || 0
      this.currentBalance = this.totalAmount - this.paidInstallments;


      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

  makePayment() {
    const payment = this.paymentForm.value.amount;
    this.paidInstallments += payment;
    this.currentBalance = this.totalAmount - this.paidInstallments;

    alert(`Payment of $${payment} made successfully!`);
    this.paymentForm.reset();
  }
}
