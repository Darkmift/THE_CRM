// instructor.test.ts

import request from 'supertest';
import app, { server } from '../../src/index';

const mockInstructor = {
    name: 'Test Instructor',
    image: 'http://example.com/test.jpg',
    description: 'This is a test instructor.',
};

const UPDATED_DESCRIPTION = 'Updated description.';

const createTestInstructor = async () => {
    const response = await request(app)
        .post('/api/instructor')
        .send(mockInstructor);
    return response;
};

describe('Instructor API', () => {
    describe('POST /api/instructor', () => {
        it('should create an instructor and return a 201 status', async () => {
            const instructorTarget = await request(app).get(
                `/api/instructor/name/${mockInstructor.name}`,
            );
            if (instructorTarget?.body?.id) {
                await request(app).delete(
                    `/api/instructor/${instructorTarget.body.id}`,
                );
            }

            const response = await createTestInstructor();
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(mockInstructor.name);
        });
    });

    describe('GET /api/instructor', () => {
        it('should return all instructors with a 200 status', async () => {
            const response = await request(app).get('/api/instructor');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/instructor/:id', () => {
        it('should return an instructor by ID with a 200 status', async () => {
            const instructorTarget = await request(app).get(
                `/api/instructor/name/${mockInstructor.name}`,
            );

            const response = await request(app).get(
                `/api/instructor/${instructorTarget.body?.id}`,
            );

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(mockInstructor.name);
        });
    });

    describe('PUT /api/instructor/:id', () => {
        it('should update an instructor and return a 200 status', async () => {
            const instructorTarget = await request(app).get(
                `/api/instructor/name/${mockInstructor.name}`,
            );
            const response = await request(app)
                .put(`/api/instructor/${instructorTarget.body.id}`)
                .send({
                    description: UPDATED_DESCRIPTION,
                });

            expect(response.status).toBe(200);
            expect(response.body.description).toBe(UPDATED_DESCRIPTION);
        });
    });

    describe('DELETE /api/instructor/:id', () => {
        it('should delete an instructor and return a 204 status', async () => {
            const instructorTarget = await request(app).get(
                `/api/instructor/name/${mockInstructor.name}`,
            );
            const response = await request(app).delete(
                `/api/instructor/${instructorTarget.body?.id}`,
            );
            expect(response.status).toBe(204);
        });
    });
});

afterAll(() => {
    server.close();
});
