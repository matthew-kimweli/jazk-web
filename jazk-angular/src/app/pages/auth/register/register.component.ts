import { CommonModule } from '@angular/common';
import { Component, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import * as Parse from 'parse';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  confirmPassword: any;
  role: any;
  password: any;
  name: any;
  email: any;
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
      if (!this.name) {
        this.toastr.error('Name is required', 'Fill in the requried fields');
        return;
      }
      if (!this.email) {
        this.toastr.error('Email is required', 'Fill in the requried fields');
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

      this.toastr.info('Signing up...');
      this.user = await Parse.User.signUp(this.email, this.password, {
        name: this.name, userType: 'public'
      });

      const acl = this.user.getACL() || new Parse.ACL();
      acl.setPublicReadAccess(true);
      acl.setRoleReadAccess('Admin', true);
      acl.setRoleWriteAccess('Admin', true);
      this.user.setACL(acl);;
      


      setTimeout(() => {
        this.ngZone.run(async () => {
          this.toastr.info('Signed up...');

          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/home');
          }
        });
      }, 1000);

      this.saving = false;

      return true;
    } catch (error) {
      console.error(error);
      this.toastr.error('Error signing up...');
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
}
