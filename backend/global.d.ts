import { DataSource } from 'typeorm';

declare global {
    namespace NodeJS {
        interface Global {
            appDataSource: DataSource;
        }
    }
    const appDataSource: DataSource;
}
