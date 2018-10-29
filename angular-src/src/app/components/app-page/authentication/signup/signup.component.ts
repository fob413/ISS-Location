import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../../services/validate.service';
import { AuthService } from '../../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
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

  onSignupSubmit() {
    const user = {
      email: this.email,
      username: this.username,
      password: this.password,
      confirmPassword: this.confirmPassword
    }

    // validate all required fields
    if (!this.validateService.validateSignup(user)){
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

    // validate passwords
    if (!this.validateService.validatePasswords(user)) {
      this.flashMessage.show('Passwords do not match', {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      return false;
    }

    // signup user
    this.spinnerService.show();
    this.authService.signupUser(user).subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully signed up', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.authService.updateAuthentication(true);

        // store token
        this.authService.saveToken(data.token);
        this.spinnerService.hide();
      } else {
        this.flashMessage.show('An error occured while signing up, please try again later', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.spinnerService.hide();
      }
    },
    error => {
      this.flashMessage.show(JSON.parse(error._body).error.message, {
        cssClass: 'alert-danger',
        timeout: 5000
      });
      this.spinnerService.hide();
    }
    );


  }

}
