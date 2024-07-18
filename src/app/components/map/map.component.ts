import { AfterViewInit, Component, inject } from '@angular/core';
import { BuslineItemComponent } from '../busline-item/busline-item.component';
import { BusStationService } from '../../services/busstation.service';
import { BusLineService } from '../../services/busline.service';
import { OsrmService } from '../../services/osrm.service';
import { environment } from '../../../environments/environment.development';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [BuslineItemComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  busStationService = inject(BusStationService);
  busLineService = inject(BusLineService);
  osrmService = inject(OsrmService);
  map: L.Map | any;
  currentPosition: L.LatLng | any = [10.0279603, 105.7664918];
  start = new L.LatLng(10.045321866882755, 105.73239384737883);
  end = new L.LatLng(10.048559943627993, 105.72614487451285);
  busStationIcon = L.icon(environment.busIcon as L.IconOptions);
  busLines: any;

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.currentPosition = [lat, lng];
      });
    }
    this.busLineService.getAllBusLines().subscribe({
      next: (res: any) => {
        this.busLines = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  initMap(): void {
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
          const marker = L.marker([lat, lng], { icon: icon })
            .bindPopup(
              `<div>Trạm dừng ${busStation.name}</div><div>${busStation.address}</div>`
            )
            .addTo(map);
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

  onChange(event: any) {
    console.log('New value = ' + event.target.value);
  }

  onClick(id: number) {
    console.log('New value = ' + id);
  }
}
