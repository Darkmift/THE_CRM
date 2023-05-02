import { getRepository } from '@/db';
import { User } from '@/entities/user';
import { Role } from '@/entities/role'; // Import the Role entity
import { NewUser } from '@/types';

export const createUser = async (newUser: NewUser): Promise<User> => {
    const repo = await getRepository(User);
    const roleRepository = await getRepository(Role);
    const role = await roleRepository.findOne({
        where: { role: newUser.role },
    });

    if (!role) {
        throw new Error(`Role "${newUser.role}" not found.`);
    }

    newUser.role = role as Role;
    return await repo.save(newUser as User);
};
