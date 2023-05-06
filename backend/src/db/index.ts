import { logger } from '@/utils/logger';
import 'reflect-metadata'; // This import is required for TypeORM
import { DataSource, ObjectType, Repository } from 'typeorm';
import connectionOptions from '@/config/ormconfig';
import { Role } from '@/entities/role';

const connToDS = async () => {
    const dataSourceConn = new DataSource(connectionOptions);
    try {
        await dataSourceConn.initialize();
        logger.info('Data Source has been initialized!');

        // Add this function to check and insert roles
        const checkAndInsertRoles = async () => {
            const roleRepository = dataSourceConn.getRepository(Role);

            const requiredRoles = ['user', 'admin'];
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

        // Call the function to check and insert roles
        await checkAndInsertRoles();

        return dataSourceConn;
    } catch (err) {
        logger.error('Error during Data Source initialization', err);
        throw err;
    }
};

export const dataSource = connToDS();

export const getRepository = async <T>(Model: ObjectType<T>) => {
    const appDataSource = await dataSource;
    const targetRepo = appDataSource.getRepository(Model);
    return targetRepo as Repository<typeof Model>;
};
