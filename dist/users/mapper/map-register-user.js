"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRegisterUser = void 0;
const mapRegisterUser = (data) => {
    return {
        login: data.login,
        email: data.email,
        createdAt: data.createdAt,
        passwordHash: data.passwordHash,
        emailConfirmation: {
            confirmationCode: '',
            expirationDate: new Date(),
            isConfirmed: true,
        }
    };
};
exports.mapRegisterUser = mapRegisterUser;
