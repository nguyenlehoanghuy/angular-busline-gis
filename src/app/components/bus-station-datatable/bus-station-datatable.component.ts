import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusStationService } from '../../services/busstation.service';
import { WardService } from '../../services/ward.service';
import { BusStation } from '../../interfaces/busstation';

@Component({
  selector: 'app-bus-station-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bus-station-datatable.component.html',
  styleUrl: './bus-station-datatable.component.css',
})
export class BusStationDatatableComponent {
  busStationService = inject(BusStationService);
  wardService = inject(WardService);
  busStations: any;
  wards: any;

  constructor() {
    this.busStationService.getAllBusStations().subscribe({
      next: (res: any) => {
        this.busStations = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });

    this.wardService.getAllWards().subscribe({
      next: (res: any) => {
        this.wards = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  addNewBusStation() {
    this.busStations.push({
      id: '',
      name: '',
      long: '',
      lat: '',
      address: '',
      id_ward: '',
    });
  }

  saveBusStation(busStation: BusStation) {
    // do something
    console.log(busStation);
  }

  removeBusStation(busStation: BusStation) {
    // do something
  }

  trackByWard(id_ward: string, id_district: string): string {
    return id_district + id_ward;
  }
}
