import { Routes, } from '@angular/router';
import LoginPageComponent from './auth/pages/login-page/login-page.component';
import RegisterPageComponent from './auth/pages/register-page/register-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent
  }

];
