import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BusLine } from '../interfaces/busline';
import { StationLine } from '../interfaces/stationline';

@Injectable({
  providedIn: 'root',
})
export class BusLineService {
  url = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  getBusLineById(id: number): Observable<BusLine> {
    return this.http.get<BusLine>(`${this.url}/bus_lines/${id}`);
  }

  getAllBusLines(): Observable<BusLine[]> {
    return this.http.get<BusLine[]>(`${this.url}/bus_lines`);
  }
}
