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
import { Instructor } from './instructor';

@Entity()
export class Internship {
    @PrimaryGeneratedColumn('rowid')
    id: string;

    @Column()
    @Index({ unique: true })
    name: string;

    @Column({ nullable: false })
    image: string;

    @Column()
    description: string;

    @ManyToMany(() => Year, year => year.internships)
    years: Year[];

    @ManyToMany(() => Project, project => project.internships)
    @JoinTable()
    projects: Project[];

    @ManyToMany(() => Instructor, instructor => instructor.internships)
    @JoinTable()
    instructors: Instructor[];
}
