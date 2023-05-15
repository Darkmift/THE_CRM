import request from 'supertest';
import app, { server } from '../../src/index';

const mockInternship = {
    name: 'Test Internship',
    image: 'http://example.com/test.jpg',
    description: 'This is a test internship.',
};

const UPDATED_DESCRIPTION = 'Updated description.';

const createTestInternship = async () => {
    const response = await request(app)
        .post('/api/internship')
        .send(mockInternship);
    return response;
};

describe('Internship API', () => {
    describe('POST /api/internship', () => {
        it('should create an internship and return a 201 status', async () => {
            const internshipTarget = await request(app).get(
                `/api/internship/name/${mockInternship.name}`,
            );
            if (internshipTarget?.body?.id) {
                await request(app).delete(
                    `/api/internship/${internshipTarget.body.id}`,
                );
            }

            const response = await createTestInternship();
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(mockInternship.name);
        });
    });

    describe('GET /api/internship', () => {
        it('should return all internships with a 200 status', async () => {
            const response = await request(app).get('/api/internship');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/internship/:id', () => {
        it('should return an internship by ID with a 200 status', async () => {
            const internshipTarget = await request(app).get(
                `/api/internship/name/${mockInternship.name}`,
            );

            const response = await request(app).get(
                `/api/internship/${internshipTarget.body?.id}`,
            );

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(mockInternship.name);
        });
    });

    describe('PUT /api/internship/:id', () => {
        it('should update an internship and return a 200 status', async () => {
            const internshipTarget = await request(app).get(
                `/api/internship/name/${mockInternship.name}`,
            );
            const response = await request(app)
                .put(`/api/internship/${internshipTarget.body.id}`)
                .send({
                    description: UPDATED_DESCRIPTION,
                });

            expect(response.status).toBe(200);
            expect(response.body.description).toBe(UPDATED_DESCRIPTION);
        });
    });

    describe('DELETE /api/internship/:id', () => {
        it('should delete an internship and return a 204 status', async () => {
            const internshipTarget = await request(app).get(
                `/api/internship/name/${mockInternship.name}`,
            );
            const response = await request(app).delete(
                `/api/internship/${internshipTarget.body?.id}`,
            );
            expect(response.status).toBe(204);
        });
    });
});

afterAll(() => {
    server.close();
});
