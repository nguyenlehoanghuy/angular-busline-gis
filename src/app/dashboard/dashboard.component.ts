import { Component } from '@angular/core';
import { BusLineDatatableComponent } from '../components/bus-line-datatable/bus-line-datatable.component';
import { BusStationDatatableComponent } from '../components/bus-station-datatable/bus-station-datatable.component';
import { StationLineDatatableComponent } from '../components/station-line-datatable/station-line-datatable.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [BusLineDatatableComponent, BusStationDatatableComponent, StationLineDatatableComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  openTab = 1;
  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }
}
