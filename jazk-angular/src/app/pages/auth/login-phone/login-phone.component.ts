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
  status: any = '';
  verificationCode: any;
  isPhoneVerified: boolean = false;
  cleanPhone: String = '';
  password: any;
  phoneUser: any;
  passwordType: string = 'password';
  loading: boolean = false;
  user: any;
  premia_result: any;

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

      phone = Number(phone).toString();
      phone = phone.replace('254', '');
      phone = `0${phone}`;

      console.log('phone2', phone);

      if (phone.length < 7) {
        console.log('Invalid phone number');
        return;
      } else {
        console.log('Phone number is valid');
      }

      this.toastr.info('Validating, please wait...');
      this.parseService.fetching = true;

      let result = await Parse.Cloud.run('loginAgentPremia', {
        phone: phone,
      });

      if (!result) {
        this.toastr.error('Unable to Signup', 'Please try again');
        this.parseService.fetching = false;
        return;
      }

      if (!result.login_result) {
        if (result.detail) {
          this.toastr.error(result.detail);
        } else {
          this.toastr.error(
            'Not Allowed',
            'You are not allowed to login. Please contact system administrator'
          );
        }
        this.parseService.fetching = false;
        return;
      }

      this.premia_result = result.login_result;

      this.parseService.fetching = false;

      console.log('user resp', result);

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
    this.parseService.fetching = true;
    let resp = await Parse.Cloud.run('verifyOTP', {
      phone: this.cleanPhone,
      code: this.verificationCode,
    });

    this.parseService.fetching = false;

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
      this.parseService.fetching = true;

      this.user = await Parse.User.logIn(username, this.password);
      if (!this.user) {
        this.toastr.error('Error: Unable to login', 'Please try again');
        return;
      }

      this.user.set('premia_access_token', this.premia_result.access_token);
      await this.user.save();

      this.loading = false;

      this.parseService.fetching = false;

      this.toastr.success('Logged in', 'Successfull...');

      this.router.navigateByUrl('/home');

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
