import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuslineItemComponent } from '../busline-item/busline-item.component';
import { BusStationService } from '../../services/busstation.service';
import { BusLineService } from '../../services/busline.service';
import { OsrmService } from '../../services/osrm.service';
import { RouteLineService } from '../../services/routeline.service';
import { environment } from '../../../environments/environment.development';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule, BuslineItemComponent],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent implements AfterViewInit {
  busStationService = inject(BusStationService);
  busLineService = inject(BusLineService);
  osrmService = inject(OsrmService);
  routeLineService = inject(RouteLineService);
  map: L.Map | any;
  currentPosition: L.LatLng | any = [10.0279603, 105.7664918];
  start = new L.LatLng(10.045321866882755, 105.73239384737883);
  end = new L.LatLng(10.048559943627993, 105.72614487451285);
  busStationIcon = L.icon(environment.busIcon as L.IconOptions);
  busLines: any;
  busLineData: any;
  busStationData: any;
  listBusLinesRouting: any = [];

  openTab = 1;
  startPoint = -1;
  endPoint = -1;

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
        this.busLineData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });

    this.busStationService.getAllBusStations().subscribe({
      next: (res: any) => {
        this.busStationData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  // Khởi tạo bản đồ
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

  // Hiển thị bản đồ
  ngAfterViewInit(): void {
    this.initMap();
    this.displayAllBusStationMarkers(this.map, this.busStationIcon);
    this.displayRoutingBetweenBusStations(this.map, this.start, this.end);
  }

  //  Hiển thị tất cả Marker trạm xe trên bản đồ
  displayAllBusStationMarkers(map: L.Map, icon: L.Icon): void {
    this.busStationService.getAllBusStations().subscribe({
      next: (res: any) => {
        for (const busStation of res.data) {
          const lat = busStation.lat;
          const lng = busStation.long;
          L.marker([lat, lng], { icon: icon })
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

  // Hiển thị đường đi giữa các trạm
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

  // Chuyển tab
  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  // Tìm tuyến
  searchBusLine(event: any) {
    this.busLines = this.busLineData.filter((busLine: any) =>
      busLine.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
  }

  // Hiển thị tuyến đường lên bản đồ
  displayBusLine(id: number) {
    this.busLineService.getAllBusStationsByIdBusLine(id).subscribe({
      next: (res: any) => {
        const listLatLng = [];
        for (const bus_station of res.data) {
          const latLng = [bus_station.lat, bus_station.long];
          listLatLng.push(latLng);
        }
        const polyline = L.polyline(listLatLng, { color: 'blue' }).addTo(
          this.map
        );
        for (const busLineRouting of this.listBusLinesRouting) {
          console.log(busLineRouting);
          this.map.removeLayer(busLineRouting);
        }
        this.listBusLinesRouting = [];
        this.listBusLinesRouting.push(polyline);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  // Test api
  onChange() {
    this.routeLineService.getRoutes(this.startPoint, this.endPoint).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  get_random_color() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.round(Math.random() * 15)];
    }
    return color;
  }
}
