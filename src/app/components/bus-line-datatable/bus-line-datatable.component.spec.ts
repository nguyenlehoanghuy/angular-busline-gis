import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusLineDatatableComponent } from './bus-line-datatable.component';

describe('BusLineDatatableComponent', () => {
  let component: BusLineDatatableComponent;
  let fixture: ComponentFixture<BusLineDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusLineDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusLineDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
