import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authToken: any;
    user: any;
    helper = new JwtHelperService();
    private authenticationSource = new BehaviorSubject(false);
    authenticated = this.authenticationSource.asObservable();

  constructor(private http: Http) { }

  loginUser(user) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('https://iss-location-app.herokuapp.com/api/v1/auth/signin',
      user,
      {headers: headers}
    ).pipe(map(res => res.json()));
  }

  saveToken(token) {
    localStorage.setItem('token', token);
    localStorage.setItem('username', this.helper.decodeToken(token).data.username);
  }

  isLoggedin() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  updateAuthentication(isAuthenticated: boolean) {
    this.authenticationSource.next(isAuthenticated);
  }
}
