import { TestBed } from '@angular/core/testing';

import { IssService } from './iss.service';

describe('IssService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IssService = TestBed.get(IssService);
    expect(service).toBeTruthy();
  });
});
