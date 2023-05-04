import request from 'supertest';
import app from '../src/index';

// import { describe, it, beforeAll } from '@jest/globals';

describe('GET /', () => {
    beforeAll(() => {
        console.log('coming inside beforeAll', process.env);
    });

    it('should return a 200 status and a message', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Hello, world!');
    });
});

describe('GET /non-existent', () => {
    it('should return a 404 status', async () => {
        const response = await request(app).get('/non-existent');
        expect(response.status).toBe(404);
    });
});
