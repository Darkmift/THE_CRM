import { getRepository } from '@/db';
import { Year } from '@/entities/year';
import { ObjectType } from 'typeorm';

export const createYear = async (newYear: Partial<Year>): Promise<Year> => {
    console.log('🚀 ~ file: services.ts:6 ~ createYear ~ newYear:', newYear);
    const repo = await getRepository(Year);
    return await repo.save(newYear as Year);
};

export const getById = async (id: string): Promise<ObjectType<Year> | null> => {
    const repo = await getRepository(Year);
    const year = await repo.findOne({ where: { id } });
    return year;
};

export const getByYear = async (
    year: string,
): Promise<ObjectType<Year> | null> => {
    const repo = await getRepository(Year);
    const foundYear = await repo.findOne({ where: { year } });
    return foundYear;
};

export const getAll = async (): Promise<ObjectType<Year>[]> => {
    const repo = await getRepository(Year);
    return await repo.find();
};

export const updateYear = async (
    id: string,
    updatedYear: Partial<ObjectType<Year>>,
): Promise<ObjectType<Year> | null> => {
    const repo = await getRepository(Year);
    const year = await repo.findOne({ where: { id } });

    if (!year) {
        throw new Error(`Year with id "${id}" not found.`);
    }

    const updated = await repo.merge(year, updatedYear);
    return await repo.save(updated);
};

export const deleteYear = async (id: string): Promise<void> => {
    const repo = await getRepository(Year);
    const year = await repo.findOne({ where: { id } });

    if (!year) {
        throw new Error(`Year with id "${id}" not found.`);
    }

    await repo.remove(year);
};
