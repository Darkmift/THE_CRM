// userRole.ts
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    Index,
} from 'typeorm';
import { User } from './user';

@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Index({ unique: true })
    role: string;

    @OneToMany(() => User, user => user.role)
    users: User[];
}
