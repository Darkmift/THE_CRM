import { getRepository } from '@/db';
import { Project } from '@/entities/project';
import { ObjectType } from 'typeorm';

export const createProject = async (
    newProject: Partial<Project>,
): Promise<Project> => {
    const repo = await getRepository(Project);
    return await repo.save(newProject as Project);
};

export const getProjectById = async (
    id: string,
): Promise<ObjectType<Project> | null> => {
    const repo = await getRepository(Project);
    const project = await repo.findOne({ where: { id } });
    if (!project) {
        return null;
    }
    return project;
};

export const getProjectByName = async (
    name: string,
): Promise<ObjectType<Project> | null> => {
    const repo = await getRepository(Project);
    const project = await repo.findOne({ where: { name } });
    if (!project) {
        return null;
    }
    return project;
};

export const getAllProjects = async (): Promise<ObjectType<Project>[]> => {
    const repo = await getRepository(Project);
    return await repo.find();
};

export const updateProject = async (
    id: string,
    updatedProject: Partial<Project>,
): Promise<ObjectType<Project> | null> => {
    const repo = await getRepository(Project);
    let project = await repo.findOne({ where: { id } });

    if (!project) {
        throw new Error(`Project with id ${id} not found.`);
    }

    const updated = repo.merge(project, updatedProject);
    return await repo.save(updated);
};

export const deleteProject = async (id: string): Promise<void> => {
    const repo = await getRepository(Project);
    const project = await repo.findOne({ where: { id } });

    if (!project) {
        throw new Error(`Project with id ${id} not found.`);
    }

    await repo.remove(project);
};
