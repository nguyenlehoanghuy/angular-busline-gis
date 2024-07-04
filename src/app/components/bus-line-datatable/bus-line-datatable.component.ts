import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusLineService } from '../../services/busline.service';
import { BusLine } from '../../interfaces/busline';

@Component({
  selector: 'app-bus-line-datatable',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bus-line-datatable.component.html',
  styleUrl: './bus-line-datatable.component.css',
})
export class BusLineDatatableComponent {
  busLineService = inject(BusLineService);
  busLines: any;
  busLineData: any;
  filterBusLine: any;

  constructor() {
    this.busLineService.getAllBusLines().subscribe({
      next: (res: any) => {
        this.busLineData = res.data;
        this.busLines = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  addNewBusLine() {
    this.busLineData.push({
      id: '',
      name: '',
      length: '',
      price: '',
      number_of_trips: '',
      time_between_trips: '',
      start_time_first: '',
    });

    this.busLines = this.busLineData;
  }

  searchBusLine() {
    this.busLines = this.busLineData.filter((busLine: any) =>
      busLine.name.toLowerCase().includes(this.filterBusLine.toLowerCase())
    );
  }

  saveBusLine(busLine: BusLine) {
    // do something
    console.log(busLine);
  }

  removeBusLine(busLine: BusLine) {
    // do something
  }
}
