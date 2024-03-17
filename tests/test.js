import supertest from 'supertest';
import server from '../startServer.js';
import { expect } from 'chai';

const request = supertest(server);

describe('Integration Test: HTTP Endpoints', () => {

    after((done) => {
        server.close(() => {
            console.log('Server stopped');
            done();
        });
    });



    it('should respond with status 200" at /contact', async () => {
        const response = await request.get('/contact');
        expect(response.status).to.equal(200);
    });
});
