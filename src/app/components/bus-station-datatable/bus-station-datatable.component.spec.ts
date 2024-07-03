import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusStationDatatableComponent } from './bus-station-datatable.component';

describe('BusStationDatatableComponent', () => {
  let component: BusStationDatatableComponent;
  let fixture: ComponentFixture<BusStationDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusStationDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusStationDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
