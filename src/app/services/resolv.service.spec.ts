import { TestBed } from '@angular/core/testing';

import { ResolvService } from './resolv.service';

describe('ResolvService', () => {
  let service: ResolvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResolvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
