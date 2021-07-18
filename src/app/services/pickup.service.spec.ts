import { TestBed, inject } from '@angular/core/testing';

import { PickupService } from './pickup.service';

describe('PickupService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PickupService]
    });
  });

  it('should be created', inject([PickupService], (service: PickupService) => {
    expect(service).toBeTruthy();
  }));
});
