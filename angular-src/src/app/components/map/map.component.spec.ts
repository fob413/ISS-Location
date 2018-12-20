import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { environment } from '../../../environments/environment.dev';
import { of } from 'rxjs';

import { MapComponent } from './map.component';
import { IssService } from 'src/app/services/iss-service/iss.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    const dummyResponse = {
      success: true,
      location: {
        longitude: 30.4166,
        latitude: 30.5843
      }
    }

    const issService = jasmine.createSpyObj('IssService', ['getLocation']);
    let getLocationSpy = issService.getLocation.and.returnValue(of(dummyResponse));

    TestBed.configureTestingModule({
      imports: [
        AgmCoreModule.forRoot({
          apiKey: environment.apiKey
        }),
        FormsModule,
        HttpModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
      ],
      declarations: [ MapComponent ],
      providers: [
        { provide: IssService, useValue: issService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have longitude, latitude and zoom as numbers', () => {
    expect(typeof component.latitude).toEqual('number');
    expect(typeof component.longitude).toEqual('number');
    expect(typeof component.zoom).toEqual('number');
  });
});
