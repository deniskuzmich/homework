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
const map_register_user_1 = require("../mapper/map-register-user");
class UsersService {
    constructor(bcryptService, usersRepository) {
        this.bcryptService = bcryptService;
        this.usersRepository = usersRepository;
    }
    createUser(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLoginExists = yield this.usersRepository.getLoginUser(queryDto.login);
            if (isLoginExists) {
                return {
                    errorsMessages: [
                        { field: "login", message: "login should be unique" }
                    ]
                };
            }
            const isEmailExists = yield this.usersRepository.getEmailUser(queryDto.email);
            if (isEmailExists) {
                return {
                    errorsMessages: [
                        { field: "email", message: "email should be unique" }
                    ]
                };
            }
            const passwordHash = yield this.bcryptService.generateHash(queryDto.password);
            const newUser = {
                login: queryDto.login,
                email: queryDto.email,
                passwordHash,
                createdAt: new Date()
            };
            const mappedUser = (0, map_register_user_1.mapRegisterUser)(newUser);
            return yield this.usersRepository.createUser(mappedUser);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!id)
                return null;
            return this.usersRepository.getUserById(id);
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield this.usersRepository.deleteUser(id);
        });
    }
}
exports.UsersService = UsersService;
