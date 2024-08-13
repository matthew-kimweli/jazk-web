import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { HeaderComponent } from '../../_components/header/header.component';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Parse from 'parse';
import { RouterModule } from '@angular/router';

declare var FlutterwaveCheckout: any;

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, HeaderComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  amount: any;
  currency: any = 'USD';
  currencies = [
    { "code": "USD", "name": "US Dollar(USD)" },
    { "code": "EUR", "name": "Euro" },
    { "code": "GBP", "name": "British Pound" },
    { "code": "NGN", "name": "Nigerian Naira" },
    { "code": "GHS", "name": "Ghanaian Cedi" },
    { "code": "ZAR", "name": "South African Rand" },
    { "code": "KES", "name": "Kenyan Shilling(KES)" },
    { "code": "UGX", "name": "Ugandan Shilling(UGX)" },
    { "code": "RWF", "name": "Rwandan Franc" }
  ]
  user: Parse.User<Parse.Attributes> | undefined;


  constructor(
    public auth: AuthService,
    private toastr: ToastrService,
  ) {
    this.auth.refreshUser()
    this.user = this.auth.currentUser;
  }


  addFunds() {
    if (!this.amount) {
      this.toastr.info('Provide an amount')
      return;
    }
    if (!this.currency) {
      this.toastr.info('Provide a currency')
      return;

    }

    this.paywFlutterwave()
  }

  async paywFlutterwave() {

    this.toastr.info('Please wait...')
    try {

      let txRef = `tulivoice__${Date.now()}`
      let payment_success = false
      let customer = {
        email: this.auth.currentUser?.get('email') || 'marmope7@gmail.com',
        phone_number: this.auth.currentUser?.get('phone'),
        name: this.auth.currentUserName,
      }

      let amount = this.amount
      let currency = this.currency


      this.toastr.info('Please wait. Connecting...')
      let PaymentRequest = Parse.Object.extend('GatewayPayment')
      let payment = new PaymentRequest()
      payment.set('type', 'flutterwave')
      payment.set('amount', amount)
      payment.set('txRef', txRef)
      payment.set('customer', customer)


      if (this.auth.currentUser) {
        payment.set('loggedInUser', this.auth.currentUser.toJSON())
        payment.set('userId', this.auth.currentUser.id)
      }



      console.log('Using subaccount', 'RS_06')

      let x = FlutterwaveCheckout({
        public_key: this.auth.API_publicKey,
        tx_ref: txRef,
        amount: amount,
        currency: currency,
        // payment_options: "mobilemoney",
        // payment_options: this.utilsService.USE_FLUTTERWAVE_GATEWAY_FOR_MM ? "mobilemoney" : "card",
        // payment_options: this.paymentMethod == 'Mobile Money' ? "mobilemoneyuganda" : "card",
        customer: customer,

        subaccounts: [
          {
            id: "RS_53F89D88A7CCF76915608B53EA22E9A9",
          }
        ],
        callback: (data: any) => { // specified callback function
          console.log(data);
          if (data.amount) {
            // this.auth.currentUser?.increment('walletBalance', data.amount)
            this.refreshUser()

            this.toastr.success("Payment Succesful", `We confirm receipt of your payment (${currency} ${Number(this.amount).toLocaleString()}). Thank you.`)
          }

          this.amount = 0

          //   {
          //     "status": "successful",
          //     "customer": {
          //         "name": "Ahabwe Emmanuel",
          //         "email": "ahabweemma@gmail.com",
          //         "phone_number": "256773314578"
          //     },
          //     "transaction_id": 825225119,
          //     "tx_ref": "apptext__FDfLi2k0cc__256773314578",
          //     "flw_ref": "b694a9c7-e4c5-4703-a312-c3583d44d63f",
          //     "currency": "UGX",
          //     "amount": 500,
          //     "charged_amount": 515,
          //     "charge_response_code": "00",
          //     "charge_response_message": "Transaction is being processed",
          //     "created_at": "2023-02-02T20:35:15.000Z"
          // }

        },
        onclose: () => {
          // close modal
          console.log('close rave modal')
          this.amount = undefined
          // if (this.payment_success) {
          //   this.router.navigateByUrl('/pay-success')
          // }
          this.refreshUser()

        },
        customizations: {
          title: `Tuli Voice`,
          description: `Paying for voice transcription`,
          logo: 'https://tulivoice.com/assets/images/logo-nobg.png',
        },
      });

      await payment.save()


    } catch (error) {
      console.error(error)
      this.toastr.error('Error while creating order. Please try again.')
    }

  }

  async refreshUser() {
    await this.auth.currentUser?.fetch()
    // location.reload()
  }


}
