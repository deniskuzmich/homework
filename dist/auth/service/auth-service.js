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
exports.authService = void 0;
const bcrypt_service_1 = require("../../common/services/bcrypt.service");
const add_1 = require("date-fns/add");
const users_repository_1 = require("../../users/repository/users.repository");
const result_status_1 = require("../../common/types/result.status");
const node_crypto_1 = require("node:crypto");
const nodemailer_service_1 = require("../../adapters/nodemailer-service");
const email_examples_1 = require("../../adapters/email-examples");
exports.authService = {
    getInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                userId: user.userId.toString(),
                login: user.login,
            };
        });
    },
    registerUser(login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield users_repository_1.usersRepository.getUserByLoginOrEmail(login);
            if (checkUser) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    errorMessage: 'User is already exists',
                    extensions: [{ field: 'Auth User', message: 'User is already exists' }],
                    data: null
                };
            }
            const passwordHash = yield bcrypt_service_1.bcryptService.generateHash(password);
            const newUser = {
                login,
                email,
                passwordHash,
                createdAt: new Date(),
                emailConfirmation: {
                    confirmationCode: (0, node_crypto_1.randomUUID)(),
                    expirationDate: (0, add_1.add)(new Date(), {
                        hours: 3,
                        minutes: 30,
                    }),
                    isConfirmed: false,
                }
            };
            yield users_repository_1.usersRepository.createUser(newUser);
            try {
                yield nodemailer_service_1.nodemailerService.sendEmail(newUser.email, newUser.emailConfirmation.confirmationCode, email_examples_1.emailExamples.registrationEmail());
            }
            catch (e) {
                console.log('Send email error', e);
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: newUser,
            };
        });
    },
    confirmEmail(code, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.getUserByLoginOrEmail(email);
            if (!user)
                return false;
            if (user.emailConfirmation.isConfirmed)
                return false;
            if (user.emailConfirmation.confirmationCode !== code)
                return false;
            if (user.emailConfirmation.expirationDate < new Date())
                return false;
            let result = yield users_repository_1.usersRepository.updateConfirmation(user._id);
            return result;
        });
    },
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.getUserByLoginOrEmail(email);
            if (!user)
                return false;
            try {
                yield nodemailer_service_1.nodemailerService.sendEmail(user.email, user.emailConfirmation.confirmationCode, email_examples_1.emailExamples.registrationEmail());
            }
            catch (e) {
                console.log('Send email error', e);
            }
            return;
        });
    }
};
