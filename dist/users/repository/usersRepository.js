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
exports.UsersRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const mongodb_1 = require("mongodb");
const add_1 = require("date-fns/add");
class UsersRepository {
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id))
                return null;
            return mongo_db_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    }
    getLoginUser(login) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.usersCollection.findOne({ login: login });
        });
    }
    getEmailUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.usersCollection.findOne({ email: email });
        });
    }
    getUserByConfirmationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongo_db_1.usersCollection.findOne({ "emailConfirmation.confirmationCode": code });
            return user;
        });
    }
    getUserByLoginOrEmail(loginOrEmail) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield mongo_db_1.usersCollection.findOne({ $or: [{ email: loginOrEmail }, { login: loginOrEmail }] });
            return user;
        });
    }
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.usersCollection.insertOne(newUser);
            return Object.assign(Object.assign({}, newUser), { _id: insertResult.insertedId });
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield mongo_db_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedUser.deletedCount < 1) {
                throw new Error("Blog not exist");
            }
        });
    }
    updateConfirmation(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield mongo_db_1.usersCollection.updateOne({ _id }, { $set: { 'emailConfirmation.isConfirmed': true } });
            return result.modifiedCount === 1;
        });
    }
    updateConfirmationCode(_id, newCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.usersCollection.updateOne({ _id }, {
                $set: {
                    'emailConfirmation.confirmationCode': newCode,
                    'emailConfirmation.expirationDate': (0, add_1.add)(new Date(), {
                        hours: 3,
                        minutes: 30,
                    })
                }
            });
        });
    }
    updateCodeForPasswordRecovery(_id, newCode) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.usersCollection.updateOne({ _id }, {
                $set: {
                    'emailConfirmation.confirmationCode': newCode,
                    'emailConfirmation.expirationDate': (0, add_1.add)(new Date(), {
                        hours: 3,
                        minutes: 30,
                    })
                }
            });
        });
    }
}
exports.UsersRepository = UsersRepository;
