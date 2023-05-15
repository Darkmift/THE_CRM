import { getRepository } from '@/db';
import { Member } from '@/entities/member';
import { ObjectType } from 'typeorm';

export const createMember = async (
    newMember: Partial<Member>,
): Promise<Member> => {
    const repo = await getRepository(Member);
    return await repo.save(newMember as Member);
};

export const getById = async (
    id: string,
): Promise<ObjectType<Member> | null> => {
    const repo = await getRepository(Member);
    const member = await repo.findOne({ where: { id } });
    return member;
};

export const getByEmail = async (
    email: string,
): Promise<ObjectType<Member> | null> => {
    const repo = await getRepository(Member);
    const member = await repo.findOne({ where: { email } });
    return member;
};

export const getAll = async (): Promise<ObjectType<Member>[]> => {
    const repo = await getRepository(Member);
    return await repo.find();
};

export const updateMember = async (
    id: string,
    updatedMember: Partial<ObjectType<Member>>,
): Promise<ObjectType<Member> | null> => {
    const repo = await getRepository(Member);
    const member = await repo.findOne({ where: { id } });

    if (!member) {
        throw new Error(`Member with id "${id}" not found.`);
    }

    const updated = await repo.merge(member, updatedMember);
    return await repo.save(updated);
};

export const deleteMember = async (id: string): Promise<void> => {
    const repo = await getRepository(Member);
    const member = await repo.findOne({ where: { id } });

    if (!member) {
        throw new Error(`Member with id "${id}" not found.`);
    }

    await repo.remove(member);
};
