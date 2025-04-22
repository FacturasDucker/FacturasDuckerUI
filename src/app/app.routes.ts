import { Routes, } from '@angular/router';
import LoginPageComponent from './auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './auth/pages/register-page/register-page.component';
import { TestPageComponent } from './test/test-page/test-page.component';
import { LandingPageComponent } from './landing-feature/pages/landing-page/landing-page.component';
import { MainViewPageComponent } from './mainView-feature/page/mainView-page/mainView-page.component';
import { RecoveryProcessPageComponent } from './recoveryProcess/pages/recoveryProcess-page/recoveryProcess-page.component';
import { FaqComponent } from './faq/fap';
import { ProccessBillPageComponent } from './proccess-bill/pages/proccess-bill-page/proccess-bill-page.component';

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
  {
    path: 'main',
    component: MainViewPageComponent,
  },
  {
    path: 'recovery',
    component: RecoveryProcessPageComponent
  },
  {
    path:'faq',
    component: FaqComponent
  },
  {
    path:"billproccess",
    component:ProccessBillPageComponent
  }

];
