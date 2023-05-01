import 'reflect-metadata'; // This import is required for TypeORM
import { DataSource } from 'typeorm';
import connectionOptions from '@/config/ormconfig';

const connToDS = async () => {
    const dataSourceConn = new DataSource(connectionOptions);
    try {
        await dataSourceConn.initialize();
        console.log('Data Source has been initialized!');
        return dataSourceConn;
    } catch (err) {
        console.error('Error during Data Source initialization', err);
    }
};

export const dataSource = connToDS();
