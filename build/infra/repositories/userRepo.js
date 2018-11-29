"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../domain/user/user"));
class UserRepo {
    constructor(userModel) {
        this.userModel = userModel;
    }
    /**
     * Return all Users as an array of User entities.
     *
     * @returns {Promise<User[]>}
     */
    all() {
        return new Promise((resolve, reject) => {
            this.userModel.find()
                .then((data) => resolve(data.map((userData) => new user_1.default(userData))))
                .catch((error) => reject(error));
        });
    }
    /**
     * Find and return a User by id.
     * Resolve null if no User is found.
     *
     * @param {string} userId
     * @returns {Promise<User|null>}
     */
    findById(userId) {
        return new Promise((resolve, reject) => {
            this.userModel.findById(userId)
                .then((userData) => {
                if (!userData) {
                    resolve(null);
                    return;
                }
                resolve(new user_1.default(userData));
            })
                .catch((error) => reject(error));
        });
    }
    /**
     * Find and return a User by email.
     * Resolve null if no User is found.
     *
     * @param {string} email
     * @returns {Promise<User|null>}
     */
    findByEmail(email) {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ email })
                .then((userData) => {
                if (userData === null) {
                    resolve(null);
                    return;
                }
                resolve(new user_1.default(userData));
            })
                .catch((error) => reject(error));
        });
    }
    /**
     * Find and return a User by username.
     * Resolve null if no User is found.
     *
     * @param {string} username
     * @returns {Promise<User|null>}
     */
    findByUsername(username) {
        return new Promise((resolve, reject) => {
            this.userModel.findOne({ username })
                .then((userData) => {
                if (userData === null) {
                    resolve(null);
                    return;
                }
                resolve(new user_1.default(userData));
            })
                .catch((error) => reject(error));
        });
    }
    /**
     * Count the number of Users.
     *
     * @return {Promise<number>}
     */
    count() {
        return new Promise((resolve, reject) => {
            this.userModel.count({})
                .then((count) => resolve(count))
                .catch((error) => reject(error));
        });
    }
    /**
     * Create a new User.
     *
     * @param {UserCreateData} data
     * @returns {Promise<User>}
     */
    create(data) {
        return new Promise((resolve, reject) => {
            this.userModel.create(data)
                .then((userData) => {
                resolve(new user_1.default(userData));
            })
                .catch((error) => reject(error));
        });
    }
    /**
     * Update input User.
     *
     * @param {string} userId
     * @param {UserUpdateData} data
     * @returns {Promise<User>}
     */
    updateUser(userId, data) {
        return new Promise((resolve, reject) => {
            this.userModel.findByIdAndUpdate(userId, data)
                .then((userData) => {
                resolve(new user_1.default(userData));
            })
                .catch((error) => reject(error));
        });
    }
}
function default_1(userModel) {
    return new UserRepo(userModel);
}
exports.default = default_1;
//# sourceMappingURL=userRepo.js.map