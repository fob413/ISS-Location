import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FunFactService } from '../../../services/fun-fact/fun-fact.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-fun-facts',
  templateUrl: './fun-facts.component.html',
  styleUrls: ['./fun-facts.component.css']
})
export class FunFactsComponent implements OnInit {
  username: string = localStorage.getItem('username');
  fact: string;

  constructor(
    private authService: AuthService,
    private spinnerService: Ng4LoadingSpinnerService,
    private funFactService: FunFactService,
    private flashMessage: FlashMessagesService
  ) { }

  getFunFact() {
    this.funFactService.getFact().subscribe(data => {
      if (data.success) {
        this.fact = data.data.fact;
      } else {
        this.fact = "Please try again by clicking to see the next fun fact.";
      }
    }, error => {
      if (error.status === 401 || error.status === 403) {
        this.flashMessage.show('Please signin.', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.signoutAction();
      } else {
        this.fact = "Please try again by clicking to see the next fun fact.";
      }
    });
  }

  ngOnInit() {
    this.getFunFact();
  }

  signoutAction() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.authService.updateAuthentication(false);
  }

  onLogOut() {
    this.spinnerService.show();
    this.authService.logoutUser().subscribe(data => {
      if (data.success) {
        this.flashMessage.show('Successfully logged out', {
          cssClass: 'alert-success',
          timeout: 5000
        });
        this.signoutAction();
        this.spinnerService.hide();
      } else {
        this.flashMessage.show('An error occured while logging out, please try again later', {
          cssClass: 'alert-danger',
          timeout: 5000
        });
        this.spinnerService.hide();
      }
    }, error => {
      this.flashMessage.show('Successfully logged out', {
        cssClass: 'alert-success',
        timeout: 5000
      });
      this.signoutAction();
      this.spinnerService.hide();
    });
  }

}

