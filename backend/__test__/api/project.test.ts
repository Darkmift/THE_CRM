// project.test.ts

import request from 'supertest';
import app, { server } from '../../src/index';

const mockProject = {
    name: 'Test Project',
    image: 'http://example.com/test.jpg',
    description: 'This is a test project.',
};

const UPDATED_DESCRIPTION = 'Updated description.';

const createTestProject = async () => {
    const response = await request(app).post('/api/project').send(mockProject);
    return response;
};

describe('Project API', () => {
    describe('POST /api/project', () => {
        it('should create a project and return a 201 status', async () => {
            const projectTarget = await request(app).get(
                `/api/project/name/${mockProject.name}`,
            );
            if (projectTarget?.body?.id) {
                await request(app).delete(
                    `/api/project/${projectTarget.body.id}`,
                );
            }

            const response = await createTestProject();
            expect(response.status).toBe(201);
            expect(response.body.name).toBe(mockProject.name);
        });
    });

    describe('GET /api/project', () => {
        it('should return all projects with a 200 status', async () => {
            const response = await request(app).get('/api/project');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/project/:id', () => {
        it('should return a project by ID with a 200 status', async () => {
            const projectTarget = await request(app).get(
                `/api/project/name/${mockProject.name}`,
            );

            const response = await request(app).get(
                `/api/project/${projectTarget.body?.id}`,
            );

            expect(response.status).toBe(200);
            expect(response.body.name).toBe(mockProject.name);
        });
    });

    describe('PUT /api/project/:id', () => {
        it('should update a project and return a 200 status', async () => {
            const projectTarget = await request(app).get(
                `/api/project/name/${mockProject.name}`,
            );
            const response = await request(app)
                .put(`/api/project/${projectTarget.body.id}`)
                .send({
                    description: UPDATED_DESCRIPTION,
                });

            expect(response.status).toBe(200);
            expect(response.body.description).toBe(UPDATED_DESCRIPTION);
        });
    });

    describe('DELETE /api/project/:id', () => {
        it('should delete a project and return a 204 status', async () => {
            const projectTarget = await request(app).get(
                `/api/project/name/${mockProject.name}`,
            );
            const response = await request(app).delete(
                `/api/project/${projectTarget.body?.id}`,
            );
            expect(response.status).toBe(204);
        });
    });
});

afterAll(() => {
    server.close();
});
