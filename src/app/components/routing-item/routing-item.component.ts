import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-routing-item',
  standalone: true,
  imports: [],
  templateUrl: './routing-item.component.html',
  styleUrl: './routing-item.component.css',
})
export class RoutingItemComponent {
  @Input() routing!: any;
}
