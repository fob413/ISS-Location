import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { FunFactService } from './fun-fact.service';

import { HttpClientModule } from '@angular/common/http'
import { HttpModule } from '@angular/http';

describe('FunFactService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpModule
    ],
    providers: [ FunFactService ]
  }));

  it('should be created', () => {
    const service: FunFactService = TestBed.get(FunFactService);
    expect(service).toBeTruthy();
  });

  describe('getFact', () => {
    it('should get a fact', () => {
      const service: FunFactService = TestBed.get(FunFactService);

      const dummyResponse = {
        success: true,
        data: {
          _id: "5bd88f0b7e4ff200209fe368",
          fact:"The space station completes 15.5 orbits a day, which means the crew members on board the station experience a sunrise or sunset every 92 minutes.","id":19,"__v":0
        }
      }

      let response;
      spyOn(service, 'getFact').and.returnValue(of(dummyResponse));

      service.getFact().subscribe(res => response = res);

      expect(response).toEqual(dummyResponse);
    })
  });
});