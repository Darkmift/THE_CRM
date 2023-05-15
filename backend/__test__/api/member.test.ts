import request from 'supertest';
import app, { server } from '../../src/index';

const mockMember = {
    email: 'test@example.com',
    firstName: 'Test',
    lastName: 'User',
};
const UPDATED_EMAIL = 'updated@example.com';

const createTestMember = async () => {
    const response = await request(app).post('/api/member').send(mockMember);
    return response;
};

describe('Member API', () => {
    describe('POST /api/member', () => {
        it('should create a member and return a 201 status', async () => {
            const memberTarget = await request(app).get(
                `/api/member/email/${UPDATED_EMAIL}`,
            );
            if (memberTarget?.body?.id) {
                await request(app).delete(
                    `/api/member/${memberTarget.body.id}`,
                );
            }

            const response = await createTestMember();
            expect(response.status).toBe(201);
            expect(response.body.email).toBe(mockMember.email);
        });
    });

    describe('GET /api/member', () => {
        it('should return all members with a 200 status', async () => {
            const response = await request(app).get('/api/member');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/member/:id', () => {
        it('should return a member by ID with a 200 status', async () => {
            const memberTarget = await request(app).get(
                `/api/member/email/${mockMember.email}`,
            );
            console.log("🚀 ~ file: member.test.ts:47 ~ it ~ memberTarget:", memberTarget.body)
            const response = await request(app).get(
                `/api/member/${memberTarget.body?.id}`,
            );

            expect(response.status).toBe(200);
            expect(response.body.email).toBe(mockMember.email);
        });
    });

    describe('PUT /api/member/:id', () => {
        it('should update a member and return a 200 status', async () => {
            const memberTarget = await request(app).get(
                `/api/member/email/${mockMember.email}`,
            );
            const response = await request(app)
                .put(`/api/member/${memberTarget.body.id}`)
                .send({
                    email: UPDATED_EMAIL,
                });

            expect(response.status).toBe(200);
            expect(response.body.email).toBe(UPDATED_EMAIL);
        });
    });

    describe('DELETE /api/member/:id', () => {
        it('should delete a member and return a 204 status', async () => {
            const memberTarget = await request(app).get(
                `/api/member/email/${UPDATED_EMAIL}`,
            );
            const response = await request(app).delete(
                `/api/member/${memberTarget.body?.id}`,
            );
            expect(response.status).toBe(204);
        });
    });
});

afterAll(() => {
    server.close();
});
