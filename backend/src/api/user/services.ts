import { getRepository } from '@/db';
import { User } from '@/entities/user';
import { Role } from '@/entities/role'; // Import the Role entity
import { NewUser } from '@/types';
import { ObjectType } from 'typeorm';

export const createUser = async (newUser: NewUser): Promise<User> => {
    const repo = await getRepository(User);
    const roleRepository = await getRepository(Role);
    const role = await roleRepository.findOne({
        where: { role: 'user' },
    });

    if (!role) {
        throw new Error(`Role "${newUser.role}" not found.`);
    }

    newUser.role = role as unknown as Role;
    return await repo.save(newUser as User);
};

export const getById = async (id: string): Promise<ObjectType<User> | null> => {
    const repo = await getRepository(User);
    const user = await repo.findOne({ where: { id } });
    return user;
};

export const getAll = async (): Promise<ObjectType<User>[]> => {
    const repo = await getRepository(User);
    return await repo.find();
};

export const getByEmail = async (
    email: string,
): Promise<ObjectType<User> | null> => {
    const repo = await getRepository(User);
    return await repo.findOne({ where: { email } });
};

export const updateUser = async (
    id: string,
    updatedUser: Partial<ObjectType<User>>,
): Promise<ObjectType<User> | null> => {
    const repo = await getRepository(User);
    const user = await repo.findOne({ where: { id } });

    if (!user) {
        throw new Error(`User with id "${id}" not found.`);
    }

    const updated = await repo.merge(user, updatedUser);
    return await repo.save(updated);
};

export const deleteUser = async (id: string): Promise<void> => {
    const repo = await getRepository(User);
    const user = await repo.findOne({ where: { id } });

    if (!user) {
        throw new Error(`User with id "${id}" not found.`);
    }

    await repo.remove(user);
};
