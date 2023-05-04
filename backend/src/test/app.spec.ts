import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';

const { expect } = chai;
chai.use(chaiHttp);

describe('GET /', () => {
    it('should return a "Hello World!" message', done => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.text).to.equal('Hello World!');
                done();
            });
    });
});
