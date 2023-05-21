import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Instructor } from './instructor';
import { Internship } from './internship';
import { Member } from './member';
import { Project } from './project';

@Entity()
export class Year {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index({ unique: true })
    year: string;

    @Column({ default: false })
    isEnabled: boolean;

    @ManyToMany(() => Instructor, instructor => instructor.years)
    @JoinTable()
    instructors: Instructor[];

    @ManyToMany(() => Internship, internship => internship.years)
    @JoinTable()
    internships: Internship[];

    @ManyToMany(() => Member, member => member.years)
    @JoinTable()
    members: Member[];

    @ManyToMany(() => Project, project => project.years)
    @JoinTable()
    projects: Project[];
}
