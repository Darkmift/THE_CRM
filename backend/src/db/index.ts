import { logger } from '@/utils/logger';
import 'reflect-metadata'; // This import is required for TypeORM
import { DataSource, ObjectType, Repository } from 'typeorm';
import connectionOptions from '@/config/ormconfig';
import { Role } from '@/entities/role';
import { Year } from '@/entities/year';

export async function testHealth() {
    try {
        const appDataSource = await dataSource;
        if (!appDataSource) throw new Error('DB INIT FAILED');
        await appDataSource.query('SELECT 1 + 1');
        return true;
    } catch (err) {
        return false;
    }
}

async function connToDS() {
    const dataSourceConn = new DataSource(connectionOptions);
    try {
        await dataSourceConn.initialize();
        logger.info('Data Source has been initialized!');

        // Add this function to check and insert roles
        const checkAndInsertRoles = async () => {
            const roleRepository = await dataSourceConn.getRepository(Role);

            const requiredRoles = ['user', 'admin', 'instructor', 'student'];
            for (const role of requiredRoles) {
                const existingRole = await roleRepository.findOne({
                    where: { role },
                });
                if (!existingRole) {
                    const newRole = new Role();
                    newRole.role = role;
                    await roleRepository.save(newRole);
                    console.log(`Role "${role}" has been inserted.`);
                }
            }
        };

        // Add this function to check and insert years
        const checkAndInsertYears = async () => {
            const yearRepository = await dataSourceConn.getRepository(Year);

            const requiredYears = ['2022', '2021', '2023'];
            for (const year of requiredYears) {
                const existingYear = await yearRepository.findOne({
                    where: { year },
                });
                if (!existingYear) {
                    const insertedYear = new Year();
                    insertedYear.year = year;
                    await yearRepository.save(insertedYear);
                    console.log(`Year "${year}" has been inserted.`);
                }
            }
        };

        // Call the function to check and insert roles
        await checkAndInsertRoles();
        await checkAndInsertYears();

        return dataSourceConn;
    } catch (err) {
        logger.error('Error during Data Source initialization', err);
        throw err;
    }
}

export const dataSource = connToDS();

export async function getRepository<T>(Model: ObjectType<T>) {
    const appDataSource = await dataSource;
    const targetRepo = appDataSource.getRepository(Model);
    return targetRepo as Repository<typeof Model>;
}
