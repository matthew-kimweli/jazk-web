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
import { MotorPaymentSuccessComponent } from './pages/motor/motor-payment-success/motor-payment-success.component';
import { ValuationLetterComponent } from './pages/portal-docs/valuation-letter/valuation-letter.component';
import { ReceiptComponent } from './pages/portal-docs/receipt/receipt.component';
import { PolicyScheduleComponent } from './pages/portal-docs/policy-schedule/policy-schedule.component';
import { DebitNoteComponent } from './pages/portal-docs/debit-note/debit-note.component';
import { AdminSettingsComponent } from './pages/admin-settings/admin-settings.component';
import { ListUsersComponent } from './pages/admin/users/list-users/list-users.component';
import { BanksComponent } from './pages/admin/banks/banks.component';
import { RatesComponent } from './pages/admin/rates/rates.component';
import { RegisterAgentComponent } from './pages/auth/register-agent/register-agent.component';
import { MakeInstallmentPaymentComponent } from './pages/agent/make-installment-payment/make-installment-payment.component';
import { ViewSaleDetailsComponent } from './pages/motor/view-sale-details/view-sale-details.component';

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
    path: 'login-email',
    component: LoginComponent,
  },
  {
    path: 'login',
    component: LoginPhoneComponent,
  },
  {
    path: 'register',
    component: RegisterAgentComponent,
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
    path: 'motor-kyc/:id',
    component: MotorKycComponent,
  },
  {
    path: 'make-payment-installment/:id',
    component: MakeInstallmentPaymentComponent,
  },
  {
    path: 'view-motor-sale/:id',
    component: ViewSaleDetailsComponent,
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
  {
    path: 'motor-payment-success/:id',
    component: MotorPaymentSuccessComponent,
  },

  {
    path: 'motor-docs',
    component: PolicyScheduleComponent,
  },

  {
    path: 'valuation-letter/:id',
    component: ValuationLetterComponent,
  },

  {
    path: 'receipt/:id',
    component: ReceiptComponent,
  },

  {
    path: 'policyschedule/:id',
    component: PolicyScheduleComponent,
  },

  {
    path: 'debitnote/:id',
    component: DebitNoteComponent,
  },

  {
    path: 'admin-settings',
    component: AdminSettingsComponent
  },

  {
    path: 'users',
    component: ListUsersComponent
  },

  {
    path: 'banks',
    component: BanksComponent
  },

  {
    path: 'rates',
    component: RatesComponent
  },

  
];
