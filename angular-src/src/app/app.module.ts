import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MapComponent } from './components/map/map.component';
import { AppPageComponent } from './components/app-page/app-page.component';
import { environment } from '../environments/environment.dev';
import { AuthenticationComponent } from './components/app-page/authentication/authentication.component';
import { LoginComponent } from './components/app-page/authentication/login/login.component';

import { AuthService } from './services/auth.service';

import { FlashMessagesModule } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SignupComponent } from './components/app-page/authentication/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    AppPageComponent,
    AuthenticationComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.apiKey
    }),
    HttpClientModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    HttpModule
  ],
  providers: [ AuthService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
