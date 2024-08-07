import { TestBed } from '@angular/core/testing';

import { RouteLineService } from './routeline.service';

describe('RoutelineService', () => {
  let service: RouteLineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteLineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
