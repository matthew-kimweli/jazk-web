import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { SearchComponent } from './pages/search/search.component';
import { ProfileEditComponent } from './pages/auth/profile-edit/profile-edit.component';

import { LoginPhoneComponent } from './pages/auth/login-phone/login-phone.component';

import { MotorCalcComponent } from './pages/motor/motor-calc/motor-calc.component';
import { MotorKycComponent } from './pages/motor/motor-kyc/motor-kyc.component';
import { ViewQuoteComponent } from './pages/motor/view-quote/view-quote.component';
import { QuotationSalesListComponent } from './pages/agent/quotation-sales-list/quotation-sales-list.component';
import { ViewQuoteSubdetailsComponent } from './pages/motor/view-quote-subdetails/view-quote-subdetails.component';
import { GenerateReportComponent } from './pages/report_list/generate-report/generate-report.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'login-phone',
    component: LoginPhoneComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'edit-profile',
    component: ProfileEditComponent,
  },

  {
    path: 'search',
    canActivate: [AuthGuardService],
    component: SearchComponent,
  },
  {
    path: 'reports',
    canActivate: [AuthGuardService],
    component: GenerateReportComponent,
  },
  {
    path: 'list/:insurance',
    canActivate: [AuthGuardService],
    component: QuotationSalesListComponent,
  },

  {
    path: 'motor-kyc',
    component: MotorKycComponent,
  },
  {
    path: 'motor',
    component: MotorCalcComponent,
  },
  {
    path: 'motor-quote',
    component: ViewQuoteComponent,
  },
  {
    path: 'motor-quote/:id',
    component: ViewQuoteComponent,
  },
  {
    path: 'motor-view-quote',
    component: ViewQuoteSubdetailsComponent,
  },
  {
    path: 'motor-view-quote/:id',
    component: ViewQuoteSubdetailsComponent,
  },
  {
    path: 'motor-kyc',
    component: MotorKycComponent,
  },
];
