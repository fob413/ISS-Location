import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateLogin(user) {
    if (user.email == undefined || user.password == undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateSignup(user) {
    if (
      user.email == undefined || user.password == undefined ||
      user.username == undefined || user.confirmPassword == undefined
      ) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  validatePasswords(user) {
    if (user.password !== user.confirmPassword) {
      return false;
    } else {
      return true;
    }
  }
}
