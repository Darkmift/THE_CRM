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
    @JoinTable()
    years: Year[];

    @ManyToMany(() => Project, project => project.instructors)
    @JoinTable()
    projects: Project[];

    @ManyToMany(() => Internship, internship => internship.instructors)
    @JoinTable()
    internships: Internship[];
}
