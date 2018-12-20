import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { IssService } from './iss.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('IssService', () => {
  let injector: TestBed;
  let service: IssService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpModule,
        HttpClientTestingModule
      ],
      providers: [IssService]
    });

    injector = getTestBed();
    service = injector.get(IssService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const service: IssService = TestBed.get(IssService);
    expect(service).toBeTruthy();
  });

  describe('getLocation', () => {
    it('should successfully get the current location', () => {
      const service: IssService = TestBed.get(IssService);
      const dummyResponse = {
        success: true,
        location: {
          longitude: 30.4166,
          latitude: 30.5843
        }
      }

      let response;
      spyOn(service, 'getLocation').and.returnValue(of(dummyResponse));

      service.getLocation().subscribe(res => response = res);

      expect(response).toEqual(dummyResponse);
    })
  });
});
