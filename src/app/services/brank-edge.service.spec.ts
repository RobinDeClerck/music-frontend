import { TestBed } from '@angular/core/testing';

import { BrankEdgeService } from './brank-edge.service';

describe('BrankEdgeService', () => {
  let service: BrankEdgeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrankEdgeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
