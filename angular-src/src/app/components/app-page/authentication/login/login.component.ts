import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validate.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  login:boolean = true;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService
    ) { }

  ngOnInit() {
    this.authService.login.subscribe(login => this.login = login);
  }

  updateLogin() {
    this.authService.updateLogin(!this.login);
  }

  onLoginSubmit() {
    const user = {
      email: this.email,
      password: this.password
    }

    // validate required fields
    if (!this.validateService.validateLogin(user)) {
      this.flashMessage.show('Please fill in all fields', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      return false;
    }

    // validate email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      return false;
    }

    // login user
    this.spinnerService.show();
    this.authService.loginUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully logged in', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.authService.updateAuthentication(true);
        
        // store token
        this.authService.saveToken(data.token);
        this.spinnerService.hide();
      } else {
        this.flashMessage.show('Invalid username or password', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.spinnerService.hide();
      }
    },
    error => {
      this.flashMessage.show('Invalid username or password', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      this.spinnerService.hide();
    });
  }
}
