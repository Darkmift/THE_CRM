import { getRepository } from '@/db';
import { Internship } from '@/entities/internship';
import { ObjectType } from 'typeorm';

export const create = async (
    newInternship: Partial<Internship>,
): Promise<Internship> => {
    const repo = await getRepository(Internship);
    return await repo.save(newInternship as Internship);
};

export const getById = async (
    id: string,
): Promise<ObjectType<Internship> | null> => {
    const repo = await getRepository(Internship);
    return await repo.findOne({ where: { id } });
};

export const getByName = async (
    name: string,
): Promise<ObjectType<Internship> | null> => {
    const repo = await getRepository(Internship);
    return await repo.findOne({ where: { name } });
};

export const getAll = async (): Promise<ObjectType<Internship>[]> => {
    const repo = await getRepository(Internship);
    return await repo.find();
};

export const update = async (
    id: string,
    updatedInternship: Partial<ObjectType<Internship>>,
): Promise<ObjectType<Internship> | null> => {
    const repo = await getRepository(Internship);
    let internship = await repo.findOne({ where: { id } });

    if (!internship) {
        throw new Error(`Internship with id ${id} not found.`);
    }

    const updated = await repo.merge(internship, updatedInternship);
    return await repo.save(updated);
};

export const deleteInternship = async (id: string): Promise<void> => {
    const repo = await getRepository(Internship);
    const internship = await repo.findOne({ where: { id } });

    if (!internship) {
        throw new Error(`Internship with id ${id} not found.`);
    }

    await repo.remove(internship);
};
