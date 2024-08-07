import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class RouteLineService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getRoutes(idStartStation: number, idEndStation: number): Observable<any> {
    return this.http.get<any>(
      `${this.url}/routes?start=${idStartStation}&end=${idEndStation}`
    );
  }
}
