import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import server from '../app';
import User from '../models/user';

dotenv.config();

use(chaiHttp);

describe('Funfacts', () => {
  let token;

  before(done => {
    User.remove({}, () => {

      // signup a user
      const user = {
        username: 'segun',
        email: 'segun@email.com',
        password: 'asdf;lkj',
        confirmPassword: 'asdf;lkj'
      };
  
      // seed fun fact
      request(server)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((err, res) => {
          token = res.body.token;

          request(server)
            .post('/api/v1/fun-fact')
            .set('token', token)
            .set('seedadmin', process.env.SEEDADMIN)
            .end((err, res) => {
              done();
            });
        });
    });
  });

  it('should seed the database with fun facts', done => {
    request(server)
      .post('/api/v1/fun-fact')
      .set('token', token)
      .set('seedadmin', process.env.SEEDADMIN)
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        done();
    });
  });

  it('should not seed the database without admin header', done => {
    request(server)
      .post('/api/v1/fun-fact')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.deep.equal(403);
        done();
    });
  });

  it('should not get a fun fact that does not exist', done => {
    request(server)
      .get('/api/v1/fun-fact/100')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.deep.equal(404);
        done();
      });
  });

  it('should not get a fun fact without setting token', done => {
    request(server)
      .get('/api/v1/fun-fact/10')
      .end((err, res) => {
        expect(res.status).to.deep.equal(403);
        done();
      });
  });

  it('should not get a fun fact with invalid token', done => {
    request(server)
      .get('/api/v1/fun-fact/10')
      .set('token', "invalid token")
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        done();
      });
  });


  it('should not seed the database with an invalid admin header', done => {
    request(server)
      .post('/api/v1/fun-fact')
      .set('token', token)
      .set('seedadmin', 'invalid token')
      .end((err, res) => {
        expect(res.status).to.deep.equal(403);
        done();
      });
  });

  it('should get a fun fact', done => {
    request(server)
      .get('/api/v1/fun-fact/10')
      .set('token', token)
      .end((err, res) => {
        expect(res.status).to.deep.equal(200);
        done();
      });
  });
});
