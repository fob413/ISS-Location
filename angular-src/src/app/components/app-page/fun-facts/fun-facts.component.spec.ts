import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { of } from 'rxjs';

import { FunFactsComponent } from './fun-facts.component';
import { FunFactService } from 'src/app/services/fun-fact/fun-fact.service';

describe('FunFactsComponent', () => {
  let component: FunFactsComponent;
  let fixture: ComponentFixture<FunFactsComponent>;

  beforeEach(async(() => {
    const dummyResponse = {
      success: true,
      data: {
        _id: "5bd88f0b7e4ff200209fe368",
        fact: `The space station completes 15.5 orbits a day, which means the crew members on board the station experience a sunrise or sunset every 92 minutes.`
      }
    }

    const funFactService = jasmine.createSpyObj('FunFactService', ['getFact']);
    let getFactSpy = funFactService.getFact.and.returnValue(of(dummyResponse));

    const username = 'testuser';
    const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWJjOWJlODFjNTc1YjkwMDIwNGFhZjIyIiwidXNlcm5hbWUiOiJGdW5zaG9zIn0sImlhdCI6MTU0NjMzODQ0NiwiZXhwIjoxNTQ2Mzg`;

    localStorage.setItem('username', username);
    localStorage.setItem('token', token);

    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
      ],
      declarations: [ FunFactsComponent ],
      providers: [
        { provide: FunFactService, useValue: funFactService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunFactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a username', () => {
    expect(component.username).toBe('testuser');
  });

  it('should have a fun fact', () => {
    expect(component.fact).toBe(`The space station completes 15.5 orbits a day, which means the crew members on board the station experience a sunrise or sunset every 92 minutes.`)
  });

  it('should clear the locatstorage when signoutAction is called', () => {
    component.signoutAction();
    expect(localStorage.getItem('token')).toBeFalsy();
    expect(localStorage.getItem('username')).toBeFalsy();
  });
});
