import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusLineService } from '../../services/busline.service';
import { BusLine } from '../../interfaces/busline';

@Component({
  selector: 'app-bus-line-datatable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bus-line-datatable.component.html',
  styleUrl: './bus-line-datatable.component.css'
})
export class BusLineDatatableComponent {
  busLineService = inject(BusLineService);
  busLines: BusLine[] = [];
  
  constructor() {
    this.busLineService.getAllBusLines().subscribe({
      next: (res: any) => {
        this.busLines = res;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete')
    });
  }

  saveBusLine(id: number) {
    // do something
  }

  removeBusLine(id: number) {
    // do something
  }
}
