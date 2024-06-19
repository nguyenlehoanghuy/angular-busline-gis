import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:5000/';

  constructor(private http: HttpClient) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`);
  }

  getAllUsers(): Observable<User> {
    return this.http.get<User>(`${this.url}`);
  }

  submitLogin(email: string, password: string) {
    console.log(
      `Login received: email: ${email}, name: ${name}, password: ${password}.`,
    );
  }
}
