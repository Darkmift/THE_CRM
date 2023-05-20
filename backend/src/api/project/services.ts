import { getRepository } from '@/db';
import { Project } from '@/entities/project';
import { Year } from '@/entities/year';
import { ObjectType } from 'typeorm';

export const createProject = async (
    newProject: Partial<Project & { year: string }>,
): Promise<ObjectType<Project>> => {
    const projectRepo = await getRepository(Project);
    const yearRepo = await getRepository(Year);

    let yearEntity = await yearRepo.findOne({
        where: { year: newProject.year },
    });

    if (!yearEntity) {
        // If the year does not exist, create it
        yearEntity = await yearRepo.save({
            year: newProject.year,
            isEnabled: true,
        });
    }

    // Now we can remove the year from newProject and assign the yearEntity to it
    const { year, ...rest } = newProject;
    const projectWithYear = {
        ...rest,
        years: [yearEntity],
    };

    const project = await projectRepo.create(projectWithYear);

    await projectRepo.save(project);
    return project;
};

export const getProjectById = async (
    id: string,
): Promise<ObjectType<Project> | null> => {
    const repo = await getRepository(Project);
    const project = await repo.findOne({ where: { id }, relations: ['years'] });
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
