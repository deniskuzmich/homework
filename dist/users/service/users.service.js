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
            return users_repository_1.usersRepository.getAllUsers(foundUsers);
        });
    },
    createUser(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const newUser = {
                login: queryDto.login,
                email: queryDto.email,
                password: queryDto.password,
                createdAt: new Date().toISOString()
            };
            const createdUser = yield users_repository_1.usersRepository.createUser(newUser);
            return createdUser;
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_repository_1.usersRepository.getUserById(id);
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield users_repository_1.usersRepository.deleteUser(id);
        });
    }
};
