import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Parse from 'parse';
import { ParseService } from '../../../services/parse.service';

@Component({
  selector: 'app-login-phone',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login-phone.component.html',
  styleUrl: './login-phone.component.css',
})
export class LoginPhoneComponent {
  returnUrl: string | null;
  phoneNumber: any;
  status = ''
  verificationCode: any;
  isPhoneVerified: boolean = false;
  cleanPhone: String = '';
  password: any;
  phoneUser: any;
  passwordType: string = 'password';
  loading: boolean = false;
  user: any;

  constructor(
    private toastr: ToastrService,
    public parseService: ParseService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
  }

  async requestVerificationCode() {
    // Validate the phone number

    try {
      console.log('phone', this.phoneNumber);
      if (!this.phoneNumber) {
        this.toastr.error('Enter phone number');
        return;
      }
      let phone: String = this.phoneNumber;
      if (phone.includes('+254')) {
      } else if (phone.includes('254')) {
        phone = `+${phone}`;
      } else if (phone.includes('773314578')) {
        phone = `+256${Number(phone)}`;
      } else if (phone.includes('773548160')) {
        phone = `+256${Number(phone)}`;
      } else {
        phone = `+254${Number(phone)}`;
      }

      phone = Number(phone).toString()

      console.log('phone2', phone);

      if (phone.length < 8) {
        console.log('Invalid phone number');
        return;
      } else {
        console.log('Phone number is valid');
      }

      let result = await Parse.Cloud.run('getUser', {
        phone: phone
      });

      console.log('user resp', result);

      if (!result.user) {
        console.log('agent not allowed');
        this.toastr.error(
          'Not Allowed',
          'You are not allowed to login. Please contact system administrator'
        );
        return;
      }

      this.status = 'codesent';
      this.phoneUser = result.user;
      this.toastr.info('Sending SMS code...');

      this.cleanPhone = phone;

      await Parse.Cloud.run('sendOTP', {
        phone: phone,
      });

      this.toastr.success('SMS has been sent');
    } catch (error) {
      console.log('Invalid phone number:', error);
      return;
    }
  }

  async verifyCode() {
    if (!this.verificationCode) {
      return;
    }

    // Here, you can implement the logic to verify the provided verification code
    console.log('Verifying code:', this.verificationCode);
    // You may use an API call or any other method to verify the code
    this.toastr.info('Verifying please wait...');
    let resp = await Parse.Cloud.run('verifyOTP', {
      phone: this.cleanPhone,
      code: this.verificationCode,
    });

    var status = resp['status'];

    if (status == 'verified') {
      this.toastr.success('Phone number verified successfully');
      // this.router.navigate(['home'])
      // Assuming the verification is successful, set isLoggedIn to true
      this.status = 'verified';
    } else {
      this.toastr.error('Invalid OTP', 'Unable to login in. Please try again.');
    }
  }

  toggleViewPassword() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
    } else if (this.passwordType == 'text') {
      this.passwordType = 'password';
    }
  }

  async onLogin(): Promise<any> {
    try {
      let cuser = Parse.User.current();
      if (cuser) {
        this.router.navigateByUrl('/home');
        this.toastr.info('Logged in', 'Please wait...');
        return;
      }

      let username = this.phoneUser.get('username');

      if (!username) {
        this.toastr.error(
          'Username is required',
          'Fill in the requried fields'
        );
        return;
      }

      if (!this.password) {
        this.toastr.error(
          'Password is required',
          'Fill in the requried fields'
        );
        return;
      }

      this.toastr.info('Logging in', 'Please wait...');
      this.loading = true;

      this.user = await Parse.User.logIn(username, this.password);

      setTimeout(() => {
        this.ngZone.run(async () => {
          let user = Parse.User.current();
          this.loading = false;

          this.toastr.success('Logged in', 'Successfull...');

          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/home');
          }
        });
      }, 1000);

      console.log(this.user);
    } catch (error: any) {
      if (error.code == 101) {
        this.toastr.error('Error', error.message);
      } else {
        console.error(error);
        this.toastr.error('Error', error.message);
      }
      this.loading = false;
    }
  }
}
