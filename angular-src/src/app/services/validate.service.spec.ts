import { TestBed } from '@angular/core/testing';

import { ValidateService } from './validate.service';

describe('ValidateService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [ ValidateService ]
  }));

  it('should be created', () => {
    const service: ValidateService = TestBed.get(ValidateService);
    expect(service).toBeTruthy();
  });

  describe('ValidateLogin', () => {
    it('should return true when user is valid', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        email: 'testuser@email.com',
        password: 'testuserpassword@1234'
      }
      expect(service.validateLogin(user)).toBe(true);
    });

    it('should return false when user.email is undefined', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        password: 'testuserpassword@1234'
      }
      expect(service.validateLogin(user)).toBe(false);
    });

    it('should return true when user.password is invalid', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        email: 'testuser@email.com'
      }
      expect(service.validateLogin(user)).toBe(false);
    });
  });

  describe('ValidateEmail', () => {
    it('should return true when email is valid', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      expect(service.validateEmail('testuser@email.com')).toBe(true);
    });

    it('should return false when email is invalid', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      expect(service.validateEmail('testuseremail.com')).toBe(false);
    });
  });

  describe('ValidateSignup', () => {
    it('should return true when user object is valid', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        email: 'testuser@email.com',
        password: 'asdf;lkj',
        username: 'testuser',
        confirmPassword: 'asdf;lkj'
      }
      expect(service.validateSignup(user)).toBe(true);
    });

    it('should return false when user.email is undefined', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        password: 'asdf;lkj',
        username: 'testuser',
        confirmPassword: 'asdf;lkj'
      }
      expect(service.validateSignup(user)).toBe(false);
    });

    it('should return false when user.password is undefined', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        email: 'testuser@email.com',
        username: 'testuser',
        confirmPassword: 'asdf;lkj'
      }
      expect(service.validateSignup(user)).toBe(false);
    });

    it('should return false when user.username is undefined', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        email: 'testuser@email.com',
        password: 'asdf;lkj',
        confirmPassword: 'asdf;lkj'
      }
      expect(service.validateSignup(user)).toBe(false);
    });

    it('should return false when user.confirmPassword is undefined', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        email: 'testuser@email.com',
        password: 'asdf;lkj',
        username: 'testuser',
      }
      expect(service.validateSignup(user)).toBe(false);
    });
  });

  describe('ValidatePasswords', () => {
    it('should return true when both passwords match', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        password: 'asdf;lkj',
        confirmPassword: 'asdf;lkj'
      }
      expect(service.validatePasswords(user)).toBe(true);
    });

    it('shuold return false when the passwords do not match', () => {
      const service: ValidateService = TestBed.get(ValidateService);
      const user = {
        password: 'asdf;lkj',
        confirmPassword: ';lkjasdf'
      }
      expect(service.validatePasswords(user)).toBe(false);
    });
  });
});
