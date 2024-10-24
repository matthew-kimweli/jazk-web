import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ParseService } from '../../../services/parse.service';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../_components/header/header.component';
import * as Parse from 'parse';
import { ToastrService } from 'ngx-toastr';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-view-sale-details',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './view-sale-details.component.html',
  styleUrl: './view-sale-details.component.css',
})
export class ViewSaleDetailsComponent {
  sale: any;
  data: any;
  totalAmount = 0; // Total amount owed
  paidInstallments = 0; // Total paid so far
  currentBalance = this.totalAmount - this.paidInstallments; // Calculate balance

  paymentForm: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    public parseService: ParseService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.paymentForm = this.fb.group({
      amount: [
        '',
        [
          Validators.required,
          Validators.min(1),
          // Validators.max(this.currentBalance),
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
      if (sale) {
        this.data = sale.toJSON();
        console.log('data', this.data);

        let installments = this.sale.get('installments') || [];
        this.totalAmount = this.sale.get('amount') || 0;
        this.paidInstallments = this.sale.get('paid_amount') || 0;
        this.currentBalance = this.totalAmount - this.paidInstallments;

        this.parseService.fetching = false;
      }
      this.parseService.fetching = false;
    } catch (error) {
      console.error(error);
      this.parseService.fetching = true;
    }
  }

  async makePayment() {
    const amount = this.paymentForm.value.amount;
    const phone = this.paymentForm.value.phone;
    // this.paidInstallments += payment;
    // this.currentBalance = this.totalAmount - this.paidInstallments;
    console.log('amount', amount)
    console.log('phone', phone)
    
    this.parseService.fetching = true;

    let res = await Parse.Cloud.run('paympesa_quick', {
      amount: amount,
      phone: phone,
    });

    console.log('res', res)

    if (!res) {
      alert(`Unable to process Payment of $${amount}!`);
      return;
    }

    let ResponseDescription = res['ResponseDescription'];
    let CheckoutRequestID = res['CheckoutRequestID'];
    let MerchantRequestID = res['MerchantRequestID'];

    this.sale.addUnique('payment_responses', res);
    // this.sale.addUnique('responseDescription', ResponseDescription);
    this.sale.addUnique('checkoutRequestIDs', CheckoutRequestID);
    this.sale.addUnique('merchantRequestIDs', MerchantRequestID);

    this.sale.set('paid', false);
    this.sale.set('payment_response', res);
    this.sale.set('responseDescription', ResponseDescription);
    this.sale.set('checkoutRequestID', CheckoutRequestID);
    this.sale.set('merchantRequestID', MerchantRequestID);

    await this.sale.save();

    this.listenForChanges(this.sale);

    this.paymentForm.reset();
  }

  async listenForChanges(payment: any) {
    let query = new Parse.Query('JazkeSale');
    query.equalTo('checkoutRequestIDs', payment.get('checkoutRequestID'));
    query.equalTo('merchantRequestID', payment.get('merchantRequestID'));

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
