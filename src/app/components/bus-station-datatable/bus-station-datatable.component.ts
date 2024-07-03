import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusStationService } from '../../services/busstation.service';
import { WardService } from '../../services/ward.service';

@Component({
  selector: 'app-bus-station-datatable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-station-datatable.component.html',
  styleUrl: './bus-station-datatable.component.css'
})
export class BusStationDatatableComponent {
  busStationService = inject(BusStationService);
  wardService = inject(WardService);
  busStations: any;
  wards: any;
  
  constructor() {
    this.busStationService.getAllBusStations().subscribe({
      next: (res: any) => {
        this.busStations = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete')
    });

    this.wardService.getAllWards().subscribe({
      next: (res: any) => {
        this.wards = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete')
    });
  }

  saveBusStation(id: number) {
    // do something
  }

  removeBusStation(id: number) {
    // do something
  }

  trackByWard(id_ward: string, id_district: string): string {
    return id_ward + id_district;
  }
}
