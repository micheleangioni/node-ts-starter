import User from './user';

export default interface IUserRepo {
  nextIdentity(): string;
  all (): Promise<User[]>;
  findById (userId: string): Promise<User|null>;
  findByEmail (email: string): Promise<User|null>;
  findByUsername (email: string): Promise<User|null>;
  count (): Promise<number>;
  persist (user: User): Promise<User>;
}
