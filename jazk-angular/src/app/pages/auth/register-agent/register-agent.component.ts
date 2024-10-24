import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Parse from 'parse';

@Component({
  selector: 'app-register-agent',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register-agent.component.html',
  styleUrl: './register-agent.component.css',
})
export class RegisterAgentComponent {
  confirmPassword: any;
  role: any;
  password: any;
  customerCode: any;
  email: any;
  phone: any;
  user: any;
  returnUrl: any;
  saving: boolean = false;
  passwordType: any = 'password';

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParamMap.get('returnUrl');
  }

  async registerUser() {
    try {
      if (!this.customerCode) {
        this.toastr.error(
          'Customer Code is required',
          'Fill in the requried fields'
        );
        return;
      }
      if (!this.email) {
        this.toastr.error('Email is required', 'Fill in the requried fields');
        return;
      }
      if (!this.phone) {
        this.toastr.error('Phone is required', 'Fill in the requried fields');
        return;
      }
      if (!this.password) {
        this.toastr.error(
          'Password is required',
          'Fill in the requried fields'
        );
        return;
      }

      if (this.password != this.confirmPassword) {
        this.toastr.error(
          'Passwords do not match',
          'Fill in the requried fields'
        );
        return;
      }

      this.saving = true;

      let phone: String = String(this.phone);
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

      // let agent = await this.checkUser()
      // if(!agent){
      //   this.toastr.error('Your are not authorised to register. Please contact system administrator')
      //   this.saving = false;
      //   return;
      // }

      // let result = await Parse.Cloud.run('getUser2', {
      //   phone: phone
      // });

      // console.log('user resp', result);

      // if (!result.user) {
      //   console.log('agent not allowed');
      //   this.toastr.error(
      //     'Not Allowed',
      //     'You are not allowed to login. Please contact system administrator'
      //   );
      //   this.saving = false;
      //   return;
      // }

      this.toastr.info('Signing up...');

      let result = await Parse.Cloud.run('registerAgentPremia', {
        phone: phone,
        email: this.email,
        cust_code: this.customerCode,
      });

      if (!result) {
        this.toastr.error('No result. Unable to Signup', 'Please try again');
        return;
      }

      if (!result.login_result) {
        if (result.detail) {
          this.toastr.error(result.detail);
        } else {
          this.toastr.error('Login failed. Unable to Signup', 'Please try again');
        }
        return;
      }

      this.user = await Parse.User.signUp(this.email, this.password, {
        name: this.customerCode,
        customerCode: this.customerCode,
        userType: 'agent',
        phone: phone,
      });

      const acl = this.user.getACL() || new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setRoleReadAccess('Admin', true);
      acl.setRoleWriteAccess('Admin', true);
      this.user.setACL(acl);

      this.user.set('premia_access_token', result.login_result.access_token);
      await this.user.save();

      this.toastr.info('Signed up...');
      this.router.navigateByUrl('/home');

      this.saving = false;

      return true;
    } catch (error) {
      console.error(error);
      // this.toastr.error('Error signing up...');
      this.toastr.error(String(error));
      this.saving = false;

      return false;
    }
  }

  gotoLogin() {
    this.router.navigate(['/login'], {
      queryParams: { returnUrl: this.returnUrl },
    });
  }

  toggleViewPassword() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text';
    } else if (this.passwordType == 'text') {
      this.passwordType = 'password';
    }
  }

  async checkUser() {
    console.log('email', this.email);
    console.log('customercode', this.customerCode);
    let Agent = Parse.Object.extend('user');
    let query = new Parse.Query('user');
    query.equalTo('cust_code', this.customerCode);
    query.equalTo('email', this.email);
    let first = await query.first();
    console.log('agent', first);
    return first;
  }
}
