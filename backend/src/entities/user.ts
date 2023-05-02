import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    Index,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { Role } from './role';

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    password: string;

    @ManyToOne(() => Role, userRole => userRole.users)
    @JoinColumn()
    role: Role;
}
