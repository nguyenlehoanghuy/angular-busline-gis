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

  constructor(private http: HttpClient) {}

  getAllBusStationsByIdBusLine(id: number): Observable<StationLine> {
    return this.http.get<StationLine>(`${this.url}/bus_lines/${id}/schedules`);
  }

  getStationLineById(stationLine: any): Observable<StationLine> {
    return this.http.get<StationLine>(
      `${this.url}/bus_lines/${stationLine.id_bus_line}/bus_stations/${stationLine.id_bus_station}`
    );
  }

  insertStationLine(stationLine: any): Observable<StationLine[]> {
    return this.http.post<StationLine[]>(
      `${this.url}/bus_lines/${stationLine.id_bus_line}/bus_stations/${stationLine.id_bus_station}`,
      {
        seq: stationLine.seq,
        start_time_first: stationLine.start_time_first,
        distance: stationLine.distance,
      }
    );
  }

  updateStationLineById(stationLine: any): Observable<StationLine[]> {
    return this.http.put<StationLine[]>(
      `${this.url}/bus_lines/${stationLine.id_bus_line}/bus_stations/${stationLine.id_bus_station}`,
      {
        seq: stationLine.seq,
        start_time_first: stationLine.start_time_first,
        distance: stationLine.distance,
      }
    );
  }

  removeStationLineById(stationLine: any): Observable<StationLine[]> {
    return this.http.delete<StationLine[]>(
      `${this.url}/bus_lines/${stationLine.id_bus_line}/bus_stations/${stationLine.id_bus_station}`
    );
  }
}
