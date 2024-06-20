import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Bus line GIS',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Bus line GIS - Đăng nhập',
  },
];
