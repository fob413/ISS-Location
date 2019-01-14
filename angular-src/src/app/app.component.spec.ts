import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { IssServiceModule } from './services/iss-service/iss-service.module';
import { FunFactModule } from './services/fun-fact/fun-fact.module';
import { AuthModule } from './services/auth/auth.module';

import { environment } from '../environments/environment.dev';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserModule,
        AgmCoreModule.forRoot({
          apiKey: environment.apiKey
        }),
        HttpClientModule,
        FormsModule,
        FlashMessagesModule.forRoot(),
        Ng4LoadingSpinnerModule.forRoot(),
        HttpModule,
        IssServiceModule,
        AuthModule,
        FunFactModule
      ],
      declarations: [
        AppComponent
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
