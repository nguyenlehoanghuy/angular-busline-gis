import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { BusLine } from '../interfaces/busline';

@Injectable({
  providedIn: 'root',
})
export class BusLineService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getBusLineById(id: number): Observable<BusLine> {
    return this.http.get<BusLine>(`${this.url}/bus_lines/${id}`);
  }

  getAllBusStationsByIdBusLine(id: number): Observable<BusLine> {
    return this.http.get<BusLine>(`${this.url}/bus_lines/${id}/bus_stations`);
  }

  getAllBusLines(): Observable<BusLine[]> {
    return this.http.get<BusLine[]>(`${this.url}/bus_lines`);
  }

  insertBusLine(busLine: any): Observable<BusLine[]> {
    return this.http.post<BusLine[]>(`${this.url}/bus_lines`, {
      name: busLine.name,
      length: busLine.length,
      price: busLine.price,
      number_of_trips: busLine.number_of_trips,
      time_between_trips: busLine.time_between_trips,
      start_time_first: busLine.start_time_first,
    });
  }

  updateBusLineById(busLine: any): Observable<BusLine[]> {
    return this.http.put<BusLine[]>(`${this.url}/bus_lines/${busLine.id}`, {
      name: busLine.name,
      length: busLine.length,
      price: busLine.price,
      number_of_trips: busLine.number_of_trips,
      time_between_trips: busLine.time_between_trips,
      start_time_first: busLine.start_time_first,
    });
  }

  removeBusLineById(id: number): Observable<BusLine[]> {
    return this.http.delete<BusLine[]>(`${this.url}/bus_lines/${id}`);
  }
}
