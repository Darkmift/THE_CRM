import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Member } from './member';
import { Internship } from './internship';
import { Instructor } from './instructor';
import { Year } from './year';

@Entity()
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    @Index({ unique: true })
    name: string;

    @Column({ nullable: false })
    image: string;

    @Column()
    description: string;

    @ManyToMany(() => Member, member => member.projects)
    members: Member[];

    @ManyToMany(() => Internship, internship => internship.projects)
    internships: Internship[];

    @ManyToMany(() => Instructor, instructor => instructor.projects)
    instructors: Instructor[];

    @ManyToMany(() => Year, year => year.projects)
    years: Year[];
}
