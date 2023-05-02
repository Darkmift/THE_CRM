import { User } from '../entities/user';
export type NewUser = Omit<User, 'id'>;
