import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ward } from '../interfaces/ward';

@Injectable({
  providedIn: 'root',
})
export class WardService {
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getWardById(id: string): Observable<Ward> {
    return this.http.get<Ward>(`${this.url}/wards/${id}`);
  }

  getAllWards(): Observable<Ward[]> {
    return this.http.get<Ward[]>(`${this.url}/wards`);
  }
}
