import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Year } from './year';
import { Project } from './project';

@Entity()
export class Member {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToMany(() => Year, year => year.members)
    years: Year[];

    @ManyToMany(() => Project, project => project.members)
    @JoinTable()
    projects: Project[];
}
