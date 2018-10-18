import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';
import User from '../models/user';

use(chaiHttp);

describe('User Signup', () => {

  before(done => {
    User.remove({}, (err) => {
      done();
    });
  });

  it('should successfully sign up a new user', done => {
    const user = {
      username: 'segun',
      email: 'segun@email.com',
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lkj'
    };

    request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        done();
      });
  });

  it('should throw an error on duplicate signup', (done) => {
    const user = {
      username: 'segun',
      email: 'segun@email.com',
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lkj'
    };

    request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(500);
        done();
      });
  });

  it('should throw an error on invalid request body', (done) => {
    const user = {
      username: 'segun',
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lkj'
    };

    request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(400);
        done();
      });
  });

  it('should throw an error on wrong url', (done) => {
    const user = {
      username: 'segun',
      password: 'asdf;lkj',
      confirmPassword: 'asdf;lkj'
    };

    request(server)
      .post('/api/v1/auth/signups')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(404);
        done();
      });
  });  
});

describe('User signin', () => {
  before(done => {
    User.remove({}, (err) => {
      // clear user database
    });

    const user = {
        username: 'funsho',
        email: 'funsho@email.com',
        password: 'asdf;lkj',
        confirmPassword: 'asdf;lkj'
      };

      request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          done();
        });
  });

  it('should sign in a valid user', (done) => {
    const user = {
      email: 'funsho@email.com',
      password: 'asdf;lkj',
    };

    request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(200);
        done();
      });
  });

  it('should not sign in an invalid email', (done) => {
    const user = {
      email: 'fun@email.com',
      password: 'asdf;lkj',
    };

    request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        done();
      });
  });

  it('should not sign in invalid data', (done) => {
    const user = {
      email: 'fun@email.com',
    };

    request(server)
      .post('/api/v1/auth/signin')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(400);
        done();
      });
  });
});
