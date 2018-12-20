 import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AuthService } from './auth.service';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpModule
    ],
    providers: [ AuthService ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });

  describe('signupUser', () => {
    it('should signup a new user', () => {
      const service: AuthService = TestBed.get(AuthService);

      const user = {
        username: 'testuser',
        password: 'asdf;lkj',
        email: 'testuser@email.com'
      }

      const dummyResponse = {
        success:true,
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWJjOWJlODFjNTc1YjkwMDIwNGFhZjIyIiwidXNlcm5hbWUiOiJGdW5zaG9zIn0sImlhdCI6MTU0NjMzODQ0NiwiZXhwIjoxNTQ2Mzg`
      }

      let response;
      spyOn(service, 'signupUser').and.returnValue(of(dummyResponse));

      service.signupUser(user).subscribe(res => {
        response = res;
      });

      expect(response).toEqual(dummyResponse);
    })
  });

  describe('loginUser', () => {
    it('should login a user', () => {
      const service: AuthService = TestBed.get(AuthService);

      const user = {
        username: 'testuser',
        password: 'asdf;lkj'
      }

      const dummyResponse = {
        success: true,
        token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNWJjOWJlODFjNTc1YjkwMDIwNGFhZjIyIiwidXNlcm5hbWUiOiJGdW5zaG9zIn0sImlhdCI6MTU0NjMzODQ0NiwiZXhwIjoxNTQ2Mzg`
      }

      let response;
      spyOn(service, 'loginUser').and.returnValue(of(dummyResponse));

      service.loginUser(user).subscribe(res => response = res);

      expect(response).toEqual(dummyResponse);
    })
  });

  describe('logoutUser', () => {
    it('should logout a user', () => {
      const service: AuthService = TestBed.get(AuthService);

      const dummyResponse = {
        success: true
      }

      let response;
      spyOn(service, 'logoutUser').and.returnValue(of(dummyResponse));

      service.logoutUser().subscribe(res => response = res);

      expect(response).toEqual(dummyResponse);
      expect(localStorage.getItem('token')).toBeFalsy();
    });
  });

  describe('isLoggedin', () => {
    it('should return true when user is logged in', () => {
      const service: AuthService = TestBed.get(AuthService);
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaWQiOiJhc2RmIn0.LLu3C7Wox7fEjW67hMCJ-wRXUhDd070xOip74L4fn8M';
      localStorage.setItem('token', token);
      expect(service.isLoggedin()).toBe(true);
    });

    it('should return false when user is not logged in', () => {
      const service: AuthService = TestBed.get(AuthService);
      localStorage.removeItem('token');
      expect(service.isLoggedin()).toBe(false);
    });
  });
});
