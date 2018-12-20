import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login.component';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        FlashMessagesModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        HttpModule,
        HttpClientModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have its login set to true', () => {
    expect(component.login).toBe(true);
  });

  it('should initially have all its form fields falsy', () => {
    expect(component.email).toBeFalsy();
    expect(component.password).toBeFalsy();
  });
});
