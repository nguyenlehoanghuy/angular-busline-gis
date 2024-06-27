import { AfterViewInit, Component, inject } from '@angular/core';
import { BusStationService } from '../../services/busstation.service';
import * as L from 'leaflet';
import 'leaflet-routing-machine';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  busStationService = inject(BusStationService);
  iconUrl = 'x-buyt.png';
  map: any;
  busStationIcon: any;

  constructor() {}

  initMap(): void {
    this.map = L.map('map', {
      center: [10.0279603, 105.7664918],
      zoom: 15,
    });

    const latlng: L.LatLng[] = [];
    latlng.push(new L.LatLng(10.0279603, 105.7664918));
    latlng.push(new L.LatLng(10.0289603, 105.7664918));

    L.Routing.control({
      waypoints: latlng,
    })
      .addTo(this.map)
      .on('routesfound', function (e) {
        const distance = e.routes[0].summary.totalDistance;
        const time = e.routes[0].summary.totalTime;

        console.log(e.routes[0].instructions);
      });

    this.busStationIcon = L.icon({
      iconUrl: this.iconUrl,
      iconSize: [32, 40],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  displayAllBusStationMarkers(map: L.Map, icon: L.Icon): void {
    this.busStationService.getAllBusStations().subscribe({
      next: (res: any) => {
        for (const busStation of res.data) {
          const lat = busStation.lat;
          const lng = busStation.long;
          L.marker([lat, lng], { icon: icon }).addTo(map);
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.displayAllBusStationMarkers(this.map, this.busStationIcon);
  }
}
