import { CUSTOM_ELEMENTS_SCHEMA, Component, NgZone } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import * as Parse from 'parse';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  password: any;
  username: any;
  user: any;
  loading: boolean = false;
  returnUrl: any;
  passwordType: any = 'password';
  waveSpeed: any = 0.1;

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private ngZone: NgZone) {
    this.returnUrl = this.activatedRoute.snapshot.queryParamMap.get('returnUrl')

  }

  async onLogin(): Promise<any> {
    try {

      let cuser = Parse.User.current()
      if (cuser) {
        this.router.navigateByUrl('/home')
        this.toastr.info('Logged in', 'Please wait...');
        return;
      }

      if (!this.username) {
        this.toastr.error('Username is required', 'Fill in the requried fields');
        return
      }

      if (!this.password) {
        this.toastr.error('Password is required', 'Fill in the requried fields');
        return
      }

      this.toastr.info('Logging in', 'Please wait...');
      this.loading = true;


      this.user = await Parse.User.logIn(this.username, this.password);

      setTimeout(() => {
        this.ngZone.run(async () => {

          let user = Parse.User.current()
          this.loading = false;


          this.toastr.success('Logged in', 'Successfull...');

          // this.authService.currentUser = user
          if (user && user.get('image')) {
            this.authService.profilePic = user.get('image')
          }

          if (this.returnUrl) {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.router.navigateByUrl('/home')
          }

        })
      }, 1000);


      console.log(this.user)

    } catch (error: any) {

      if (error.code == 101) {
        this.toastr.error('Error', error.message);
      } else {
        console.error(error)
        this.toastr.error('Error', error.message);
      }
      this.loading = false;
    }

  }

  signup() {
    this.toastr.info('Contact System Administrator', 'Please contact the system administrator to create a new account')
  }

  gotoRegister() {
    this.router.navigate(['/register'], { queryParams: { returnUrl: this.returnUrl } });
  }

  toggleViewPassword() {
    if (this.passwordType == 'password') {
      this.passwordType = 'text'
    } else if (this.passwordType == 'text') {
      this.passwordType = 'password'
    }
  }
}
