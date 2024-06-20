import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = 'https://xettuyen.ctu.edu.vn/api';
  access_token = 'access_token';
  user_key = 'auth-user';

  constructor(private http: HttpClient) {}

  submitLogin(email: string, password: string): Observable<any> {
    console.log(`Login received: email: ${email}, password: ${password}.`);
    return this.http.post<any>(`${this.url}/auth/login`, {
      email: email,
      password: password,
    });
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.access_token);
  }

  setToken(token: string): void {
    sessionStorage.removeItem(this.access_token);
    sessionStorage.setItem(this.access_token, token);
  }

  getUser(): string | null {
    const user = sessionStorage.getItem(this.user_key);
    return user ? JSON.parse(user) : null;
  }

  setUser(user: string): void {
    sessionStorage.removeItem(this.user_key);
    sessionStorage.setItem(this.user_key, JSON.stringify(user));
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
