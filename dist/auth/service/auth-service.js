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
const map_to_user_view_model_1 = require("../../users/mapper/map-to-user-view-model");
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
            const isLoginExists = yield users_repository_1.usersRepository.getLoginUser(login);
            if (isLoginExists) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'login', message: "login is already exists" }],
                    data: null
                };
            }
            const isEmailExists = yield users_repository_1.usersRepository.getEmailUser(email);
            if (isEmailExists) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: "email is already exists" }],
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
                yield nodemailer_service_1.nodemailerService.sendEmail(newUser.email, email_examples_1.emailExamples.registrationEmail(newUser.emailConfirmation.confirmationCode));
            }
            catch (e) {
                console.log('Send email error', e);
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: null,
            };
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
            if (user.emailConfirmation.isConfirmed)
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: "email is already confirmed" }],
                    data: null
                };
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
    },
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.getUserByConfirmationCode(code);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'The user data in not correct' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.isConfirmed) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'The code is already applied' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.confirmationCode !== code) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'The code is incorrect' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.expirationDate < new Date()) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'The code is expired' }],
                    data: false,
                };
            }
            let result = yield users_repository_1.usersRepository.updateConfirmation(user._id);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: result,
            };
        });
    },
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_repository_1.usersRepository.getUserByLoginOrEmail(email);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [],
                    data: false,
                };
            }
            if (user.emailConfirmation.isConfirmed)
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'The email is already confirmed' }],
                    data: false,
                };
            try {
                yield nodemailer_service_1.nodemailerService.sendEmail(user.email, email_examples_1.emailExamples.registrationEmail(user.emailConfirmation.confirmationCode));
            }
            catch (e) {
                console.log('Send email error', e);
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: true,
            };
        });
    }
};
