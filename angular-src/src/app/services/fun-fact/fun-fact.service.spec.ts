import { TestBed } from '@angular/core/testing';

import { FunFactService } from './fun-fact.service';

describe('FunFactService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FunFactService = TestBed.get(FunFactService);
    expect(service).toBeTruthy();
  });
});
