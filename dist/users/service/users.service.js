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
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersService = void 0;
const users_repository_1 = require("../repository/users.repository");
const map_to_user_view_model_1 = require("../mapper/map-to-user-view-model");
const bcrypt_service_1 = require("../../common/services/bcrypt.service");
const result_status_1 = require("../../common/types/result.status");
exports.usersService = {
    createUser(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLoginExists = yield users_repository_1.usersRepository.getLoginUser(queryDto.login);
            if (isLoginExists) {
                return {
                    errorsMessages: [
                        { field: "login", message: "login should be unique" }
                    ]
                };
            }
            const isEmailExists = yield users_repository_1.usersRepository.getEmailUser(queryDto.email);
            if (isEmailExists) {
                return {
                    errorsMessages: [
                        { field: "email", message: "email should be unique" }
                    ]
                };
            }
            const passwordHash = yield bcrypt_service_1.bcryptService.generateHash(queryDto.password);
            const newUser = {
                login: queryDto.login,
                email: queryDto.email,
                passwordHash,
                createdAt: new Date().toISOString()
            };
            return yield users_repository_1.usersRepository.createUser(newUser);
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return null;
            return users_repository_1.usersRepository.getUserById(id);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield users_repository_1.usersRepository.deleteUser(id);
        });
    },
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.getUserByLoginOrEmail(loginOrEmail);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.Unauthorized,
                    extensions: [],
                    data: null
                };
            }
            const isPassCorrect = yield bcrypt_service_1.bcryptService.checkPassword(password, user.passwordHash);
            if (!isPassCorrect) {
                return {
                    status: result_status_1.ResultStatus.Unauthorized,
                    extensions: [{ field: 'auth', message: 'Bad request to login' }],
                    data: null
                };
            }
            const result = (0, map_to_user_view_model_1.mapToUserViewModel)(user);
            return {
                status: result_status_1.ResultStatus.Success,
                extensions: [],
                data: result
            };
        });
    }
};
