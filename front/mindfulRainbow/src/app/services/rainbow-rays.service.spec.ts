import { TestBed } from '@angular/core/testing';

import { RainbowRaysService } from './rainbow-rays.service';

describe('RainbowRaysService', () => {
  let service: RainbowRaysService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RainbowRaysService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
