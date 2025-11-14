"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const users_repository_1 = require("../repository/users.repository");
const users_query_repository_1 = require("../repository/users-query.repository");
const bcrypt_1 = __importDefault(require("bcrypt"));
const map_to_user_view_model_1 = require("../mapper/map-to-user-view-model");
exports.usersService = {
    getAllUsers(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const foundUsers = {
                sortBy: (_a = queryDto.sortBy) !== null && _a !== void 0 ? _a : 'createdAt',
                sortDirection: (_b = queryDto.sortDirection) !== null && _b !== void 0 ? _b : 'desc',
                pageNumber: queryDto.pageNumber ? Number(queryDto.pageNumber) : 1,
                pageSize: queryDto.pageSize ? Number(queryDto.pageSize) : 10,
                searchLoginTerm: (_c = queryDto.searchLoginTerm) !== null && _c !== void 0 ? _c : null,
                searchEmailTerm: (_d = queryDto.searchEmailTerm) !== null && _d !== void 0 ? _d : null
            };
            return users_query_repository_1.usersQueryRepository.getAllUsers(foundUsers);
        });
    },
    createUser(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLoginExists = yield users_query_repository_1.usersQueryRepository.getLoginUser(queryDto.login);
            if (isLoginExists) {
                return {
                    errorsMessages: [
                        { field: "login", message: "login should be unique" }
                    ]
                };
            }
            const isEmailExists = yield users_query_repository_1.usersQueryRepository.getEmailUser(queryDto.email);
            if (isEmailExists) {
                return {
                    errorsMessages: [
                        { field: "email", message: "email should be unique" }
                    ]
                };
            }
            const passwordSalt = yield bcrypt_1.default.genSalt(10);
            const passwordHash = yield bcrypt_1.default.hash(queryDto.password, passwordSalt);
            const newUser = {
                login: queryDto.login,
                email: queryDto.email,
                passwordSalt,
                passwordHash,
                createdAt: new Date().toISOString()
            };
            return yield users_repository_1.usersRepository.createUser(newUser);
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_query_repository_1.usersQueryRepository.getUserById(id);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield users_repository_1.usersRepository.deleteUser(id);
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_query_repository_1.usersQueryRepository.getUserByLoginOrEmail(loginOrEmail);
            if (!user)
                return null;
            const passwordHash = yield bcrypt_1.default.hash(password, user.passwordSalt);
            if (user.passwordHash !== passwordHash) {
                return null;
            }
            return (0, map_to_user_view_model_1.mapToUserViewModel)(user);
        });
    }
};
