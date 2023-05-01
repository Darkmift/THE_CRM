import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { NODE_ENV, PORT, LOG_FORMAT } from '@/config';
import validateEnv from '@/utils/validateEnv';
import { logger, stream } from '@/utils/logger';
import { dataSource } from './db';
import { User } from './entities/user';
import { Role } from './entities/role';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';

validateEnv();
dotenv.config();

const app: Express = express();
const port = PORT || 5000;

(async () => {
    try {
        const appDataSource = await dataSource;
        if (!appDataSource) throw new Error('DB INIT FAILED');
        (globalThis as any).appDataSource = appDataSource;
    } catch (error) {
        console.log('🚀 ~ file: index.ts:21 ~ error:', error);
        logger.error(`=DB INIT FAILED=`, error);
        throw new Error('DB INIT FAILED');
    }
})();

app.use(morgan(LOG_FORMAT, { stream }));

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

app.get('/health', async (req: Request, res: Response) => {
    const data: any = {
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
        sqlConnection: null,
    };
    try {
        const roleRepository = appDataSource.getRepository(Role);
        const userRepository = appDataSource.getRepository(User);

        // Create user roles if they do not exist
        const adminRole = await roleRepository.findOne({
            where: { role: 'admin' },
        });
        const userRole = await roleRepository.findOne({
            where: { role: 'user' },
        });

        if (!adminRole || !userRole) return;

        // Create an array of 10 mock users
        const mockUsers = [
            {
                firstName: 'Alice',
                lastName: 'Smith',
                email: 'alice.smith@example.com',
                role: userRole,
            },
            {
                firstName: 'Bob',
                lastName: 'Johnson',
                email: 'bob.johnson@example.com',
                role: userRole,
            },
            {
                firstName: 'Carol',
                lastName: 'Williams',
                email: 'carol.williams@example.com',
                role: userRole,
            },
            {
                firstName: 'David',
                lastName: 'Brown',
                email: 'david.brown@example.com',
                role: adminRole,
            },
            {
                firstName: 'Eve',
                lastName: 'Jones',
                email: 'eve.jones@example.com',
                role: userRole,
            },
            {
                firstName: 'Frank',
                lastName: 'Garcia',
                email: 'frank.garcia@example.com',
                role: userRole,
            },
            {
                firstName: 'Grace',
                lastName: 'Miller',
                email: 'grace.miller@example.com',
                role: userRole,
            },
            {
                firstName: 'Hank',
                lastName: 'Davis',
                email: 'hank.davis@example.com',
                role: userRole,
            },
            {
                firstName: 'Ivy',
                lastName: 'Rodriguez',
                email: 'ivy.rodriguez@example.com',
                role: userRole,
            },
            {
                firstName: 'Jack',
                lastName: 'Martinez',
                email: 'jack.martinez@example.com',
                role: adminRole,
            },
        ];

        // Insert the mock users into the database
        await userRepository.save(mockUsers);

        const result = await userRepository.find({ relations: ['role'] });
        console.log('🚀 ~ file: index.ts:43 ~ app.get ~ result:', result);
        data.sqlConnection = 'Ok';
        data.users = result;
    } catch (error) {
        if (error instanceof QueryFailedError) {
            // Check for SQLite unique constraint error code
            console.error(error);
            if (error.driverError.errno === 19) {
                data.sqlUniqueError = error.message;
            } else {
                console.error(
                    'Query failed for another reason:',
                    error.message,
                );
            }
        } else {
            console.error('Unknown error:', error);
        }
        if (error instanceof Error) {
            data.sqlConnection = error.message;
        }
        data.sqlConnection = 'error validating sql structure';
    }

    res.status(200).send(data);
});

app.listen(port, () => {
    console.log(`⚡️[NODE_ENV]: ${NODE_ENV}`);
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);

    logger.info(`=================================`);
    logger.info(`======= ENV: ${NODE_ENV} =======`);
    logger.info(`🚀 [server]: Server is running at http://localhost:${port}`);
    logger.info(`=================================`);
});
