import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    authToken: any;
    user: any;
    helper = new JwtHelperService();
    private authenticationSource = new BehaviorSubject(false);
    authenticated = this.authenticationSource.asObservable();

    private loginSource = new BehaviorSubject(true);
    login = this.loginSource.asObservable();

  constructor(private http: Http, private httpClient: HttpClient) { }

  loginUser(user) {
    return this.http.post('/api/v1/auth/signin',
      user
    ).pipe(map(res => res.json()));
  }

  signupUser(user) {
    return this.http.post('/api/v1/auth/signup',
      user
    ).pipe(map(res => res.json()));
  }

  logoutUser(): Observable<any> {
    return this.httpClient.put('/api/v1/auth/signout', {});
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

  updateLogin(login: boolean) {
    this.loginSource.next(login);
  }
}
