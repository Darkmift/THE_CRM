import { getRepository } from '@/db';
import { Instructor } from '@/entities/instructor';
import { ObjectType } from 'typeorm';

export const create = async (
    newInstructor: Partial<Instructor>,
): Promise<Instructor> => {
    const repo = await getRepository(Instructor);
    return await repo.save(newInstructor as Instructor);
};

export const getById = async (
    id: string,
): Promise<ObjectType<Instructor> | null> => {
    const repo = await getRepository(Instructor);
    const instructor = await repo.findOne({ where: { id } });
    if (!instructor) {
        return null;
    }
    return instructor;
};

export const getByName = async (
    name: string,
): Promise<ObjectType<Instructor> | null> => {
    const repo = await getRepository(Instructor);
    const instructor = await repo.findOne({ where: { name } });
    if (!instructor) {
        return null;
    }
    return instructor;
};

export const getAll = async (): Promise<ObjectType<Instructor>[]> => {
    const repo = await getRepository(Instructor);
    return await repo.find();
};

export const update = async (
    id: string,
    updatedInstructor: Partial<Instructor>,
): Promise<ObjectType<Instructor> | null> => {
    const repo = await getRepository(Instructor);
    let instructor = await repo.findOne({ where: { id } });

    if (!instructor) {
        throw new Error(`Instructor with id ${id} not found.`);
    }

    const updated = repo.merge(instructor, updatedInstructor);
    return await repo.save(updated);
};

export const deleteInstructor = async (id: string): Promise<void> => {
    const repo = await getRepository(Instructor);
    const instructor = await repo.findOne({ where: { id } });

    if (!instructor) {
        throw new Error(`Instructor with id ${id} not found.`);
    }

    await repo.remove(instructor);
};
