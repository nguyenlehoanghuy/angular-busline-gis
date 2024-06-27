import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { District } from '../interfaces/district';

@Injectable({
  providedIn: 'root',
})
export class DistrictService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getDistrictById(id: string): Observable<District> {
    return this.http.get<District>(`${this.url}/districts/${id}`);
  }

  getAllDistricts(): Observable<District[]> {
    return this.http.get<District[]>(`${this.url}/districts`);
  }
}
