import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutingItemComponent } from './routing-item.component';

describe('RoutingItemComponent', () => {
  let component: RoutingItemComponent;
  let fixture: ComponentFixture<RoutingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoutingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
