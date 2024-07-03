import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { userGuard } from './guards/user.guard';

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
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Bus line GIS - Bảng điều khiển',
    canActivate: [userGuard],
  },
];
