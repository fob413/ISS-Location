import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-app-page',
  templateUrl: './app-page.component.html',
  styleUrls: ['./app-page.component.css']
})
export class AppPageComponent implements OnInit {

  authenticated: boolean = false;
  helper = new JwtHelperService();

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.authenticated.subscribe(auth => this.authenticated = auth);
    
    if (localStorage.getItem('token')) {
      if (this.helper.isTokenExpired(localStorage.getItem('token'))){
        localStorage.removeItem('token');
      } else {
        this.authService.updateAuthentication(true);
      }
    }
  }

}
