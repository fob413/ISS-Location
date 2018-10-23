import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

use(chaiHttp);

describe('International Space Station', () => {
  it('should return the current location', done => {
    request(server)
      .get('/api/v1/location')
      .end((err, res) => {
        expect(res.status).to.deep.equal(200);
        done();
      });
  });
});
