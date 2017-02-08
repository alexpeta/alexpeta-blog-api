import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import * as e from '../src/providers/ExpressAppProvider';

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET api/v1/articles", () => {
    it("responds with JSON array",() => {
        let expressAppProvider = new e.ExpressAppProvider();
        let expressApp = expressAppProvider.getExpressInstance();

        return chai.request(expressApp).get('/api/v1/articles')
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response).to.be.json;
            expect(response.body).to.be.an('array');
        });
    });

    // it('should include Wolverine', () => {
    //     return chai.request(app).get('/api/v1/heroes')
    //     .then(res => {
    //         let Wolverine = res.body.find(hero => hero.name === 'Wolverine');
    //         expect(Wolverine).to.exist;
    //         expect(Wolverine).to.have.all.keys(['id','name','aliases','occupation','gender','height','hair','eyes','powers']);
    //     });
    // });
});

describe('GET api/v1/heroes/:id', () => {
    it('responds with single JSON object', () => {
        let expressAppProvider = new e.ExpressAppProvider();
        let expressApp = expressAppProvider.getExpressInstance();

        return chai.request(expressApp).get('/api/v1/articles/1')
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response).to.be.json;
            expect(response.body).to.be.an('object');
        });
    });

    it('should return "The Blog Is Live"', () => {
        let expressAppProvider = new e.ExpressAppProvider();
        let expressApp = expressAppProvider.getExpressInstance();

        return chai.request(expressApp).get('/api/v1/articles/2')
        .then(res => {
            expect(res.body.Title).to.equal('The Blog Is Live');
         });
    });
});