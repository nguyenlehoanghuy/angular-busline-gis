import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationCardLogoComponent } from '../../components/authentication-card-logo/authentication-card-logo.component';
import { GoogleLogoComponent } from '../../components/google-logo/google-logo.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationCardLogoComponent,
    GoogleLogoComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  authService = inject(AuthService);

  constructor(private router: Router) {}

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    this.authService
      .submitLogin(
        this.loginForm.value.email ?? '',
        this.loginForm.value.password ?? ''
      )
      .subscribe({
        next: (user) => {
          this.authService.setToken(user.access_token);
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.info('complete'),
      });
  }
}
