import { AfterViewInit, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BuslineItemComponent } from '../busline-item/busline-item.component';
import { RoutingItemComponent } from '../routing-item/routing-item.component';
import { BusStationService } from '../../services/busstation.service';
import { BusLineService } from '../../services/busline.service';
import { OsrmService } from '../../services/osrm.service';
import { RouteLineService } from '../../services/routeline.service';
import { environment } from '../../../environments/environment.development';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BuslineItemComponent,
    RoutingItemComponent,
  ],
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
  busStationIcon = L.icon(environment.busIcon as L.IconOptions);
  gpsIcon = L.icon(environment.gpsIcon as L.IconOptions);
  busLines: any;
  busLineData: any;
  busStationData: any;
  listBusLinesRouting: any = [];

  openTab = 1;
  startPoint = -1;
  endPoint = -1;
  routing: any;

  constructor() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        this.currentPosition = [lat, lng];
        L.marker([lat, lng], { icon: this.gpsIcon }).addTo(this.map);
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

  // Hiển thị tuyến bus lên bản đồ
  displayBusLine(id: number) {
    this.busLineService.getAllBusStationsByIdBusLine(id).subscribe({
      next: (res: any) => {
        const coordinates = [];
        for (const bus_station of res.data) {
          const latLng = `${bus_station.long},${bus_station.lat}`;
          coordinates.push(latLng);
        }

        this.osrmService
          .getRouting(
            'route',
            'v1',
            'car',
            coordinates.join(';'),
            'alternatives=false&steps=true&geometries=geojson&overview=full&annotations=true'
          )
          .subscribe({
            next: (res: any) => {
              console.log(res);
              if (res.code == 'Ok') {
                const listLatLng = [];
                for (const step of res.routes[0].geometry.coordinates) {
                  const LatLng = new L.LatLng(step[1], step[0]);
                  listLatLng.push(LatLng);
                }
                console.log(listLatLng);
                const polyline = L.polyline(listLatLng, {
                  color: 'blue',
                }).addTo(this.map);
                for (const busLineRouting of this.listBusLinesRouting) {
                  this.map.removeLayer(busLineRouting);
                }
                this.listBusLinesRouting = [];
                this.listBusLinesRouting.push(polyline);
              }
            },
            error: (err) => {
              console.log(err);
            },
            complete: () => console.info('complete'),
          });
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => console.info('complete'),
    });
  }

  // Hiển thị đường đi giữa 2 tuyến tìm được
  displayRouting(rank: number) {
    const nodes = this.routing[rank].nodes;
    const coordinates = [];
    for (const node of nodes) {
      console.log(node);
      const latLng = `${node.lng},${node.lat}`;
      coordinates.push(latLng);
    }

    this.osrmService
      .getRouting(
        'route',
        'v1',
        'car',
        coordinates.join(';'),
        'alternatives=false&steps=true&geometries=geojson&overview=full&annotations=true'
      )
      .subscribe({
        next: (res: any) => {
          if (res.code == 'Ok') {
            const listLatLng = [];
            for (const step of res.routes[0].geometry.coordinates) {
              const LatLng = new L.LatLng(step[1], step[0]);
              listLatLng.push(LatLng);
            }
            const polyline = L.polyline(listLatLng, {
              color: 'blue',
            }).addTo(this.map);
            for (const busLineRouting of this.listBusLinesRouting) {
              this.map.removeLayer(busLineRouting);
            }
            this.listBusLinesRouting = [];
            this.listBusLinesRouting.push(polyline);
          }
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => console.info('complete'),
      });
  }

  // Tim đường đi từ trạm bắt đầu đến trạm kết thúc
  computeRoute() {
    this.routeLineService.getRoutes(this.startPoint, this.endPoint).subscribe({
      next: (res: any) => {
        this.routing = res.data;
        this.routing.sort((a: any, b: any) => a.total_weight - b.total_weight);
        this.routing.forEach((item: any, index: any) => {
          item.rank = index;
        });
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
