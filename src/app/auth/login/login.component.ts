import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationCardLogoComponent } from '../../components/authentication-card-logo/authentication-card-logo.component';
import { GoogleLogoComponent } from '../../components/google-logo/google-logo.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, AuthenticationCardLogoComponent, GoogleLogoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  userService = inject(UserService);

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitLogin() {
    this.userService.submitLogin(
      this.loginForm.value.email ?? '',
      this.loginForm.value.password ?? '',
    );
  }
}
