import { TestBed, inject } from '@angular/core/testing';

import { OverallService } from './overall.service';

describe('OverallService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OverallService]
    });
  });

  it('should be created', inject([OverallService], (service: OverallService) => {
    expect(service).toBeTruthy();
  }));
});
