import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BusStation } from '../interfaces/busstation';
import { StationLine } from '../interfaces/stationline';

@Injectable({
  providedIn: 'root',
})
export class BusStationService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBusStationById(id: number): Observable<BusStation> {
    return this.http.get<BusStation>(`${this.url}/bus_stations/${id}`);
  }

  getAllBusStations(): Observable<BusStation[]> {
    return this.http.get<BusStation[]>(`${this.url}/bus_stations`);
  }
}
