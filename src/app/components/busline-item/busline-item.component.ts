import { Component, Input } from '@angular/core';
import { BusLine } from '../../interfaces/busline';

@Component({
  selector: 'app-busline-item',
  standalone: true,
  imports: [],
  templateUrl: './busline-item.component.html',
  styleUrl: './busline-item.component.css',
})
export class BuslineItemComponent {
  @Input() busLine!: BusLine;
}
