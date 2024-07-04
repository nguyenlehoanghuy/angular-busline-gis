import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { StationLine } from '../interfaces/stationline';

@Injectable({
  providedIn: 'root',
})
export class StationLineService {
  url = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllBusStationsByIdBusLine(id: number): Observable<StationLine> {
    return this.http.get<StationLine>(`${this.url}/bus_lines/${id}/bus_stations`);
  }
}
