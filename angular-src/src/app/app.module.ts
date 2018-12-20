import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { IssServiceModule } from './services/iss-service/iss-service.module';
import { FunFactModule } from './services/fun-fact/fun-fact.module';
import { AuthModule } from './services/auth/auth.module';
import { AuthInterceptor } from './services/auth.interceptor';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/map/map.component';
import { AppPageComponent } from './components/app-page/app-page.component';
import { environment } from '../environments/environment.dev';
import { AuthenticationComponent } from './components/app-page/authentication/authentication.component';
import { LoginComponent } from './components/app-page/authentication/login/login.component';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SignupComponent } from './components/app-page/authentication/signup/signup.component';
import { FunFactsComponent } from './components/app-page/fun-facts/fun-facts.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    AppPageComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent,
    FunFactsComponent
  ],
  imports: [
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
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
