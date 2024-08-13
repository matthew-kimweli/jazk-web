import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProfileComponent } from './pages/auth/profile/profile.component';
import { AuthGuardService } from './services/auth-guard.service';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { ContractCreateComponent } from './pages/contract-create/contract-create.component';
import { SearchComponent } from './pages/search/search.component';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuardService]
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
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: 'new-contract',
        canActivate: [AuthGuardService],
        component: ContractCreateComponent,
      },
       {
        path: 'search',
        canActivate: [AuthGuardService],
        component: SearchComponent,
      },
      
  
];
