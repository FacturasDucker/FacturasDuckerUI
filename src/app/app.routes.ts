import { Routes, } from '@angular/router';
import LoginPageComponent from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { TestPageComponent } from './test/test-page/test-page.component';
import { LandingPageComponent } from './landing-feature/pages/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent,
  },
  {
    path: 'register',
    component: RegisterPageComponent
  },
  {
    path: 'test',
    component: TestPageComponent
  },
  {
    path: '',
    component: LandingPageComponent
  },


];
