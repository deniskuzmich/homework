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
exports.UsersService = void 0;
const usersRepository_1 = require("../repository/usersRepository");
const map_register_user_1 = require("../mapper/map-register-user");
const composition_root_1 = require("../../core/composition/composition-root");
class UsersService {
    createUser(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLoginExists = yield usersRepository_1.UsersRepository.getLoginUser(queryDto.login);
            if (isLoginExists) {
                return {
                    errorsMessages: [
                        { field: "login", message: "login should be unique" }
                    ]
                };
            }
            const isEmailExists = yield usersRepository_1.UsersRepository.getEmailUser(queryDto.email);
            if (isEmailExists) {
                return {
                    errorsMessages: [
                        { field: "email", message: "email should be unique" }
                    ]
                };
            }
            const passwordHash = yield composition_root_1.bcryptService.generateHash(queryDto.password);
            const newUser = {
                login: queryDto.login,
                email: queryDto.email,
                passwordHash,
                createdAt: new Date()
            };
            const mappedUser = (0, map_register_user_1.mapRegisterUser)(newUser);
            return yield usersRepository_1.UsersRepository.createUser(mappedUser);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return null;
            return usersRepository_1.UsersRepository.getUserById(id);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield usersRepository_1.UsersRepository.deleteUser(id);
        });
    }
}
exports.UsersService = UsersService;
