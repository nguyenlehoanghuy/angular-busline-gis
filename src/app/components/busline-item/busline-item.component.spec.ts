import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuslineItemComponent } from './busline-item.component';

describe('BuslineItemComponent', () => {
  let component: BuslineItemComponent;
  let fixture: ComponentFixture<BuslineItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuslineItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuslineItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
