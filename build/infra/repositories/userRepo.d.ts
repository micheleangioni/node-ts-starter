import { Model } from 'mongoose';
import { UserCreateData, UserUpdateData } from '../../domain/user/declarations';
import User from '../../domain/user/user';
import { IUserRepo } from './declarations';
declare class UserRepo implements IUserRepo {
    protected userModel: Model<any>;
    constructor(userModel: Model<any>);
    /**
     * Return all Users as an array of User entities.
     *
     * @returns {Promise<User[]>}
     */
    all(): Promise<User[]>;
    /**
     * Find and return a User by id.
     * Resolve null if no User is found.
     *
     * @param {string} userId
     * @returns {Promise<User|null>}
     */
    findById(userId: string): Promise<User | null>;
    /**
     * Find and return a User by email.
     * Resolve null if no User is found.
     *
     * @param {string} email
     * @returns {Promise<User|null>}
     */
    findByEmail(email: string): Promise<User | null>;
    /**
     * Find and return a User by username.
     * Resolve null if no User is found.
     *
     * @param {string} username
     * @returns {Promise<User|null>}
     */
    findByUsername(username: string): Promise<User | null>;
    /**
     * Count the number of Users.
     *
     * @return {Promise<number>}
     */
    count(): Promise<number>;
    /**
     * Create a new User.
     *
     * @param {UserCreateData} data
     * @returns {Promise<User>}
     */
    create(data: UserCreateData): Promise<User>;
    /**
     * Update input User.
     *
     * @param {string} userId
     * @param {UserUpdateData} data
     * @returns {Promise<User>}
     */
    updateUser(userId: string, data: UserUpdateData): Promise<User>;
}
export default function (userModel: Model<any>): UserRepo;
export {};
