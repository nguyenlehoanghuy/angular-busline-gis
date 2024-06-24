import { TestBed } from '@angular/core/testing';

import { BusStationService } from './busstation.service';

describe('BusStationService', () => {
  let service: BusStationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusStationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
