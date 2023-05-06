import request from 'supertest';
import app, { server } from '../src/index';

// import { describe, it, beforeAll } from '@jest/globals';

describe('GET /', () => {
    it('should return a 200 status and a message', async () => {
        const response = await request(app).get('/health');
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Ok');
    });
});

describe('GET /non-existent', () => {
    it('should return a 404 status', async () => {
        const response = await request(app).get('/non-existent');
        expect(response.status).toBe(404);
    });
});

afterAll(() => {
    server.close();
});
