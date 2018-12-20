import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  login:boolean = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.login.subscribe(login => this.login = login);
  }

}
