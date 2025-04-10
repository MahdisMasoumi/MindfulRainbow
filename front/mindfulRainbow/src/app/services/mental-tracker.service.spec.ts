import { TestBed } from '@angular/core/testing';

import { MentalTrackerService } from './mental-tracker.service';

describe('MentalTrackerService', () => {
  let service: MentalTrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentalTrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
