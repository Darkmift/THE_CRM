// dotenv and validateenv
import validateEnv from '@/utils/validateEnv';
validateEnv();

// express
import express, { Express, NextFunction, Request, Response } from 'express';
// libs
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import errorHandler from '@/api/common/middlwares/error-handler';
import mainRouter from '@/main.router';
import { NODE_ENV, PORT, LOG_FORMAT } from '@/config';
import { logger, stream } from '@/utils/logger';
import { dataSource } from '@/db';

const app: Express = express();
const port = PORT || 5000;

app.use(express.json());

app.use(morgan(LOG_FORMAT, { stream }));

app.all('*', (req: Request, res: Response, next: NextFunction) => {
    req.uuid = uuidv4();
    next();
});

app.get('/health', async (req: Request, res: Response) => {
    const data: any = {
        uuid: req.uuid,
        uptime: process.uptime(),
        message: 'Ok',
        date: new Date(),
        sqlConnection: null,
    };
    try {
        const appDataSource = await dataSource;
        if (!appDataSource) throw new Error('DB INIT FAILED');
        await appDataSource.query('SELECT 1 + 1');
        data.sqlConnection = 'Ok';
    } catch (error) {
        logger.error('🚀 ~ api/health db conn error:', error);
        data.sqlConnection = 'failed';
    }

    res.status(200).send(data);
});

app.use('/api', mainRouter);

app.use((req: Request, res: Response) => {
    res.status(404).json({ error: 'Resource not found' });
});

// Always last (global error handler)
app.use(errorHandler);

export const server = app.listen(port, () => {
    if (process.env.NODE_ENV !== 'tests') {
        console.log(`⚡️[NODE_ENV]: ${NODE_ENV}`);
        console.log(
            `⚡️[server]: Server is running at http://localhost:${port}`,
        );

        logger.info(`=================================`);
        logger.info(`======= ENV: ${NODE_ENV} ========`);
        logger.info(
            `🚀 [server]: Server is running at http://localhost:${port}`,
        );
        logger.info(`=================================`);
    }
});

export default app;
