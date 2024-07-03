import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StationLineDatatableComponent } from './station-line-datatable.component';

describe('StationLineDatatableComponent', () => {
  let component: StationLineDatatableComponent;
  let fixture: ComponentFixture<StationLineDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StationLineDatatableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StationLineDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
