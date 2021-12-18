const app = require('../../../app/app');
const request = require('supertest');

describe('integrationテスト', () => {
    it('GET helloworld', async () => {
        const response = await request(app).get('/helloworld');
    
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Hello, world!!!' });
    });
});
