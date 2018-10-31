// var expect = require('chai').expect;
import { use, request, expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../app';

use(chaiHttp);

// Test suite
describe('ISSLocation',  () => {
	// Test spec (unit test)
	it('should run tests',  (done) => {
		expect(true).to.be.ok;
		done();
	});

	it('should serve the client', done => {
		request(server)
			.get('/')
			.end((err, res) => {
				expect(res.status).to.deep.equal(200);
				done();
			});
	});
});