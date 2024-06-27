import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.apiUrl;
  access_token = environment.access_token;
  access_user = environment.access_user;

  constructor(private http: HttpClient) {}

  submitLogin(email: string, password: string): Observable<any> {
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

  getUser(): User | null {
    const user = sessionStorage.getItem(this.access_user);
    return user ? JSON.parse(user) : null;
  }

  setUser(user: User): void {
    sessionStorage.removeItem(this.access_user);
    sessionStorage.setItem(this.access_user, JSON.stringify(user));
  }

  clearStorage(): void {
    sessionStorage.clear();
  }
}
