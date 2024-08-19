import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BusStation } from '../interfaces/busstation';

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

  insertBusStation(busStation: any): Observable<BusStation[]> {
    return this.http.post<BusStation[]>(`${this.url}/bus_stations`, {
      name: busStation.name,
      long: busStation.long,
      lat: busStation.lat,
      address: busStation.address,
      id_ward: busStation.id_ward,
    });
  }

  updateBusStationById(busStation: any): Observable<BusStation[]> {
    return this.http.put<BusStation[]>(
      `${this.url}/bus_stations/${busStation.id}`,
      {
        name: busStation.name,
        long: busStation.long,
        lat: busStation.lat,
        address: busStation.address,
        id_ward: busStation.id_ward,
      }
    );
  }

  removeBusStationById(id: number): Observable<BusStation[]> {
    return this.http.delete<BusStation[]>(`${this.url}/bus_stations/${id}`);
  }
}
