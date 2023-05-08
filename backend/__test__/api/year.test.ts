import request from 'supertest';
import app, { server } from '../../src/index';

const mockYear = {
    year: '2025',
    isEnabled: true,
};
const UPDATED_YEAR = '5000';

const createTestYear = async () => {
    const response = await request(app).post('/api/year').send(mockYear);
    return response;
};

describe('Year API', () => {
    describe('POST /api/year', () => {
        it('should create a year and return a 201 status', async () => {
            const yearTarget = await request(app).get(
                `/api/year/year/${UPDATED_YEAR}`,
            );
            if (yearTarget?.body?.id) {
                await request(app).delete(`/api/year/${yearTarget.body.id}`);
            }

            const response = await createTestYear();
            expect(response.status).toBe(201);
            expect(response.body.year).toBe('2025');
        });
    });

    describe('GET /api/year', () => {
        it('should return all years with a 200 status', async () => {
            const response = await request(app).get('/api/year');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/year/:id', () => {
        it('should return a year by ID with a 200 status', async () => {
            const yearTarget = await request(app).get(
                `/api/year/year/${mockYear.year}`,
            );
            const response = await request(app).get(
                `/api/year/${yearTarget.body?.id}`,
            );

            expect(response.status).toBe(200);
            expect(response.body.year).toBe(mockYear.year);
        });
    });

    describe('PUT /api/year/:id', () => {
        it('should update a year and return a 200 status', async () => {
            const yearTarget = await request(app).get(
                `/api/year/year/${mockYear.year}`,
            );
            const response = await request(app)
                .put(`/api/year/${yearTarget.body.id}`)
                .send({
                    year: UPDATED_YEAR,
                });

            expect(response.status).toBe(200);
            expect(response.body.year).toBe(UPDATED_YEAR);
        });
    });

    describe('DELETE /api/year/:id', () => {
        it('should delete a year and return a 204 status', async () => {
            const yearTarget = await request(app).get(
                `/api/year/year/${UPDATED_YEAR}`,
            );
            const response = await request(app).delete(
                `/api/year/${yearTarget.body?.id}`,
            );
            expect(response.status).toBe(204);
        });
    });
});

afterAll(() => {
    server.close();
});
