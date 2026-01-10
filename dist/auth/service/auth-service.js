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
exports.AuthService = void 0;
const add_1 = require("date-fns/add");
const result_status_1 = require("../../common/types/result.status");
const node_crypto_1 = require("node:crypto");
const email_examples_1 = require("../../adapters/email-examples");
const map_to_user_view_model_1 = require("../../users/mapper/map-to-user-view-model");
class AuthService {
    constructor(bcryptService, nodemailerService, usersRepository) {
        this.bcryptService = bcryptService;
        this.nodemailerService = nodemailerService;
        this.usersRepository = usersRepository;
    }
    getInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return {
                userId: user.userId.toString(),
                login: user.login,
                email: user.email
            };
        });
    }
    registerUser(login, email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const isLoginExists = yield this.usersRepository.getLoginUser(login);
            if (isLoginExists) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'login', message: "login is already exists" }],
                    data: null
                };
            }
            const isEmailExists = yield this.usersRepository.getEmailUser(email);
            if (isEmailExists) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: "email is already exists" }],
                    data: null
                };
            }
            const passwordHash = yield this.bcryptService.generateHash(password);
            const newUser = {
                login,
                email,
                passwordHash,
                createdAt: new Date(),
                passwordRecovery: {
                    recoveryCode: null,
                    expirationDate: null,
                },
                emailConfirmation: {
                    confirmationCode: (0, node_crypto_1.randomUUID)(),
                    expirationDate: (0, add_1.add)(new Date(), {
                        hours: 3,
                        minutes: 30,
                    }),
                    isConfirmed: false,
                }
            };
            yield this.usersRepository.createUser(newUser);
            try {
                yield this.nodemailerService.sendEmail(newUser.email, email_examples_1.emailExamples.registrationEmail(newUser.emailConfirmation.confirmationCode));
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
    }
    checkCredentials(loginOrEmail, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.getUserByLoginOrEmail(loginOrEmail);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.Unauthorized,
                    extensions: [],
                    data: null
                };
            }
            const isPassCorrect = yield this.bcryptService.checkPassword(password, user.passwordHash);
            if (!isPassCorrect) {
                return {
                    status: result_status_1.ResultStatus.Unauthorized,
                    extensions: [{ field: 'auth', message: 'Bad request to password' }],
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
    confirmEmail(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.getUserByConfirmationCode(code);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'code', message: 'The user data in not correct' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.isConfirmed) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'code', message: 'The code is already applied' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.confirmationCode !== code) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'code', message: 'The code is incorrect' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.expirationDate < new Date()) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'code', message: 'The code is expired' }],
                    data: false,
                };
            }
            let result = yield this.usersRepository.updateConfirmation(user._id);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: result,
            };
        });
    }
    resendEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.getUserByLoginOrEmail(email);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'This login or email is not exist' }],
                    data: false,
                };
            }
            if (user.emailConfirmation.isConfirmed)
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'email', message: 'This email is already confirmed' }],
                    data: false,
                };
            const newCode = (0, node_crypto_1.randomUUID)();
            yield this.usersRepository.updateConfirmationCode(user._id, newCode);
            try {
                yield this.nodemailerService.sendEmail(user.email, email_examples_1.emailExamples.registrationEmail(newCode));
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
    passwordRecovery(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.getUserByLoginOrEmail(email);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.NoContent,
                    extensions: [],
                    data: true,
                };
            }
            const newCode = (0, node_crypto_1.randomUUID)();
            yield this.usersRepository.updateCodeForPasswordRecovery(email, newCode);
            try {
                yield this.nodemailerService.sendEmail(user.email, email_examples_1.emailExamples.passwordRecovery(newCode));
            }
            catch (e) {
                console.log('Send password recovery error', e);
            }
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: true,
            };
        });
    }
    newPassword(newPassword, recoveryCode) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.usersRepository.getUserByRecoveryCode(recoveryCode);
            if (!user) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'recoveryCode', message: 'recovery code is not correct' }],
                    data: true,
                };
            }
            if (recoveryCode !== user.passwordRecovery.recoveryCode) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'newPassword', message: 'The new password is not correct' }],
                    data: false,
                };
            }
            if (!newPassword) {
                return {
                    status: result_status_1.ResultStatus.BadRequest,
                    extensions: [{ field: 'newPassword', message: 'The new password is not correct' }],
                    data: false,
                };
            }
            const passwordHash = yield this.bcryptService.generateHash(newPassword);
            yield this.usersRepository.createNewPassword(user === null || user === void 0 ? void 0 : user._id, passwordHash);
            yield this.usersRepository.clearRecoveryData(user === null || user === void 0 ? void 0 : user._id);
            return {
                status: result_status_1.ResultStatus.NoContent,
                extensions: [],
                data: true,
            };
        });
    }
}
exports.AuthService = AuthService;
