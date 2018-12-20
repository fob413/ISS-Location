import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPageComponent } from './app-page.component';
import { FunFactsComponent } from './fun-facts/fun-facts.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';

import { AuthService } from '../../services/auth/auth.service';

import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

describe('AppPageComponent', () => {
  let component: AppPageComponent;
  let fixture: ComponentFixture<AppPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpModule,
        HttpClientModule,
        FlashMessagesModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot()
      ],
      declarations: [ 
        AppPageComponent,
        FunFactsComponent,
        AuthenticationComponent,
        LoginComponent,
        SignupComponent
      ],
      providers:[
        AuthService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have authenticated initially as false', () => {
    expect(component.authenticated).toBe(false);
  });

  it('should have authenticated changed to true when logged in', () => {
    const authService: AuthService = TestBed.get(AuthService);

    authService.updateAuthentication(true);
    expect(component.authenticated).toBe(true);
  });
});
