import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToMany,
} from 'typeorm';
import { Year } from './year';
import { Project } from './project';
import { Internship } from './internship';

@Entity()
export class Instructor {
    @PrimaryGeneratedColumn('rowid')
    id: string;

    @Column()
    @Index({ unique: true })
    name: string;

    @Column({ nullable: false })
    image: string;

    @Column()
    description: string;

    @ManyToMany(() => Year, year => year.instructors)
    years: Year[];

    @ManyToMany(() => Project, project => project.instructors)
    projects: Project[];

    @ManyToMany(() => Internship, internship => internship.instructors)
    internships: Internship[];
}
