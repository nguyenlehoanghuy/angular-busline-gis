import { TestBed } from '@angular/core/testing';

import { StationLineService } from './stationline.service';

describe('StationlineService', () => {
  let service: StationLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StationLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
