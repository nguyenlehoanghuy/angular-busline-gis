import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Bus line GIS',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Bus line GIS - Đăng nhập',
  },
];
