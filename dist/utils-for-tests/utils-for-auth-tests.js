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
exports.testSeeder = void 0;
const node_crypto_1 = require("node:crypto");
const add_1 = require("date-fns/add");
const mongo_db_1 = require("../db/mongo.db");
exports.testSeeder = {
    createUser() {
        return {
            login: 'testing',
            email: 'test@gmail.com',
            password: '123456789'
        };
    },
    insertUser(_a) {
        return __awaiter(this, arguments, void 0, function* ({ login, email, password, code, expirationDate, isConfirmed }) {
            const newUser = {
                login,
                email,
                passwordHash: password,
                createdAt: new Date(),
                emailConfirmation: {
                    confirmationCode: code !== null && code !== void 0 ? code : (0, node_crypto_1.randomUUID)(),
                    expirationDate: expirationDate !== null && expirationDate !== void 0 ? expirationDate : (0, add_1.add)(new Date(), {
                        minutes: 30,
                    }),
                    isConfirmed: isConfirmed !== null && isConfirmed !== void 0 ? isConfirmed : false
                }
            };
            const res = yield mongo_db_1.usersCollection.insertOne(Object.assign({}, newUser));
            return Object.assign({ _id: res.insertedId }, newUser);
        });
    }
};
