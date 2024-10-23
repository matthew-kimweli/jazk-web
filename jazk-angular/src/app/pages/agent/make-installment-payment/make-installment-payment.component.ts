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
import { ActivatedRoute, Router } from '@angular/router';
import * as Parse from 'parse';
import { ToastrService } from 'ngx-toastr';

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
    private toastr: ToastrService,
    private router: Router,
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
      phone: ['', [Validators.required]],
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
      let installments = this.sale.get('installments') || [];
      this.totalAmount = this.sale.get('amount') || 0;
      this.paidInstallments = this.sale.get('paid_amount') || 0;
      this.currentBalance = this.totalAmount - this.paidInstallments;

      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

  async makePayment() {
    const payment = this.paymentForm.value.amount;
    const phone = this.paymentForm.value.phone;
    this.paidInstallments += payment;
    this.currentBalance = this.totalAmount - this.paidInstallments;

    let res = await Parse.Cloud.run('paympesa_quick', {
      amount: payment,
      phone: phone,
    });

    if (!res) {
      alert(`Unable to process Payment of $${payment}!`);
      return;
    }
    let ResponseDescription = res['ResponseDescription'];
    let CheckoutRequestID = res['CheckoutRequestID'];

    this.sale.addUnique('payment_responses', res);
    // this.sale.addUnique('responseDescription', ResponseDescription);
    this.sale.addUnique('checkoutRequestIDs', CheckoutRequestID);
    this.sale.set('paid', false)
    await this.sale.save()

    this.listenForChanges(payment);

    this.paymentForm.reset();
  }

  
  async listenForChanges(payment: any) {
    let query = new Parse.Query('JazkeSale');
    query.equalTo('checkoutRequestIDs', payment.get('checkoutRequestID'));

    let subscription = await query.subscribe();

    subscription.on('open', () => {
      console.log('subscription opened');
    });

    subscription.on('create', (object) => {
      console.log('object created', object);
    });

    subscription.on('update', (object) => {
      console.log('object updated', object);
      let status = object.get('paymentStatus') || '';
      if (status) {
        this.toastr.info(status);
      }

      if (object.get('paid')) {
        this.parseService.fetching = false;
        this.router.navigate(['/motor-payment-success', payment.id]);
        subscription.unsubscribe();
      }
    });

    // let object = await query.first()
    // if (object) {

    // }
  }
}
