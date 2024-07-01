import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OsrmService {
  url = environment.osrmUrl;

  constructor(private http: HttpClient) {}

  getRouting(
    service: string,
    version: string,
    profile: string,
    coordinates: string,
    options: string
  ): Observable<any> {
    return this.http.get<any>(
      `${this.url}/${service}/${version}/${profile}/${coordinates}?${options}`
    );
  }
}
