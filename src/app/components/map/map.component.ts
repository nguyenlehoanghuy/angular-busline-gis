import { AfterViewInit, Component, inject } from '@angular/core';
import { BusStationService } from '../../services/busstation.service';
import { OsrmService } from '../../services/osrm.service';
import { environment } from '../../../environments/environment.development';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  busStationService = inject(BusStationService);
  osrmService = inject(OsrmService);
  map: L.Map | any;
  currentPosition: L.LatLng | any = [10.0279603, 105.7664918];
  start = new L.LatLng(10.045321866882755, 105.73239384737883);
  end = new L.LatLng(10.048559943627993, 105.72614487451285);
  busStationIcon = L.icon(environment.busIcon as L.IconOptions);

  constructor() {}

  initMap(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.currentPosition = [lat, lng];
      });
    }

    this.map = L.map('map', {
      center: this.currentPosition,
      zoom: 15,
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

  displayRoutingBetweenBusStations(
    map: L.Map,
    start: L.LatLng,
    end: L.LatLng
  ): void {
    const coordinates = `${start.lng},${start.lat};${end.lng},${end.lat}`;
    this.osrmService
      .getRouting(
        'route',
        'v1',
        'car',
        coordinates,
        'alternatives=false&steps=true&geometries=geojson&overview=full&annotations=true'
      )
      .subscribe({
        next: (res: any) => {
          if (res.code == 'Ok') {
            const listLatLng = [];
            console.log(res.routes[0].legs[0]);
            for (const step of res.routes[0].legs[0].steps) {
              console.log(step);
              for (const LngLat of step.geometry.coordinates) {
                const LatLng = new L.LatLng(LngLat[1], LngLat[0]);
                listLatLng.push(LatLng);
              }
            }
            L.polyline(listLatLng, { color: 'blue' }).addTo(this.map);
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
    this.displayRoutingBetweenBusStations(this.map, this.start, this.end);
  }
}
