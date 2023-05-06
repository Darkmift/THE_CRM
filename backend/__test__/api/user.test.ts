import request from 'supertest';
import app, { server } from '../../src/index';

const mockUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    role: 'user',
    password: 'Password123',
};

const createTestUser = async () => {
    const response = await request(app).post('/api/user').send(mockUser);
    return response;
};

const getUserId = async () => {
    const response = await request(app).get(
        `/api/user/email/${mockUser.email}`,
    );
    return response.body.id;
};

describe('User API', () => {
    describe('POST /api/user', () => {
        it('should create a user and return a 201 status', async () => {
            await createTestUser();
            await request(app).delete(`/api/user/${await getUserId()}`);

            const response = await createTestUser();
            console.log(
                '🚀 ~ file: user.test.ts:31 ~ it ~ response:',
                response.body.role,
            );
            expect(response.status).toBe(201);
            expect(response.body.firstName).toBe('John');
            expect(response.body.lastName).toBe('Doe');
            expect(response.body.email).toBe('john.doe@example.com');
            expect(response.body.role.role).toBe('user');
        });
    });

    describe('GET /api/user', () => {
        it('should return all users with a 200 status', async () => {
            const response = await request(app).get('/api/user');
            expect(response.status).toBe(200);
            expect(response.body.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe('GET /api/user/email/:email', () => {
        it('should return a user by email with a 200 status', async () => {
            const response = await request(app).get(
                `/api/user/email/${mockUser.email}`,
            );

            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe('John');
            expect(response.body.lastName).toBe('Doe');
            expect(response.body.email).toBe('john.doe@example.com');
            expect(response.body.role.role).toBe('user');
        });
    });

    describe('GET /api/user/:id', () => {
        it('should return a user by ID with a 200 status', async () => {
            const resByEmail = await request(app).get(
                `/api/user/email/${mockUser.email}`,
            );

            const response = await request(app).get(
                `/api/user/${resByEmail.body.id}`,
            );
            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe('John');
            expect(response.body.lastName).toBe('Doe');
            expect(response.body.email).toBe('john.doe@example.com');
            expect(response.body.role.role).toBe('user');
        });
    });

    describe('PUT /api/user/:id', () => {
        it('should update a user and return a 200 status', async () => {
            const response = await request(app)
                .put(`/api/user/${await getUserId()}`)
                .send({
                    firstName: 'Jane',
                    lastName: 'Doe',
                });

            expect(response.status).toBe(200);
            expect(response.body.firstName).toBe('Jane');
            expect(response.body.lastName).toBe('Doe');
        });
    });

    describe('DELETE /api/user/:id', () => {
        it('should delete a user and return a 204 status', async () => {
            const response = await request(app).delete(
                `/api/user/${await getUserId()}`,
            );
            expect(response.status).toBe(204);
        });
    });
});

afterAll(() => {
    server.close();
});
