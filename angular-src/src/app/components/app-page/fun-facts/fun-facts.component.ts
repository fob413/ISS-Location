import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { FunFactService } from '../../../services/fun-fact.service';

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
    private funFactService: FunFactService
  ) { }

  getFunFact() {
    this.funFactService.getFact().subscribe(data => {
      if (data.success) {
        this.fact = data.data.fact;
      } else {
        this.fact = "Please try again by clicking to see the next fun fact."
      }
    })
  }

  ngOnInit() {
    this.getFunFact();
  }

  onLogOut() {
    this.spinnerService.show();
    setTimeout(() => {
      this.authService.logoutUser();
      this.authService.updateAuthentication(false);
      this.spinnerService.hide();
    }, 3000);
  }

}

