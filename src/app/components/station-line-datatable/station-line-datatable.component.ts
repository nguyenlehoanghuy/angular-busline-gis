import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusLineService } from '../../services/busline.service';
import { BusStationService } from '../../services/busstation.service';
import { StationLineService } from '../../services/stationline.service';
import { StationLine } from '../../interfaces/stationline';

@Component({
  selector: 'app-station-line-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './station-line-datatable.component.html',
  styleUrl: './station-line-datatable.component.css',
})
export class StationLineDatatableComponent {
  busLineService = inject(BusLineService);
  busStationService = inject(BusStationService);
  stationLineService = inject(StationLineService);
  filterIdBusLine = -1;
  busLines: any;
  busStations: any;
  stationLines: any;

  constructor() {
    this.busLineService.getAllBusLines().subscribe({
      next: (res: any) => {
        this.busLines = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
    this.busStationService.getAllBusStations().subscribe({
      next: (res: any) => {
        this.busStations = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  displayBusStationByIdBusLine(id: number) {
    this.stationLineService.getAllBusStationsByIdBusLine(id).subscribe({
      next: (res: any) => {
        this.stationLines = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  addNewStationLine() {
    this.stationLines.push({
      id_bus_station: '',
      id_bus_line: '',
      seq: '',
      start_time_first: '',
      distance: '',
    });
  }

  saveStationLine(stationLine: StationLine) {
    // do something
    console.log(stationLine);
  }

  removeStationLine(stationLine: StationLine) {
    // do something
  }

  trackByStationLine(id_bus_station: number, id_bus_line: number): string {
    return `${id_bus_station}${id_bus_line}`;
  }
}
