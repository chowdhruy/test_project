import { TestBed, inject } from '@angular/core/testing';

import { ConsignmentService } from './consignment.service';

describe('ConsignmentService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConsignmentService]
    });
  });

  it('should be created', inject([ConsignmentService], (service: ConsignmentService) => {
    expect(service).toBeTruthy();
  }));
});
