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
exports.usersRepository = void 0;
const mongo_db_1 = require("../../db/mongo.db");
const map_to_user_view_model_1 = require("../mapper/map-to-user-view-model");
const map_user_for_front_1 = require("../mapper/map-user-for-front");
const mongodb_1 = require("mongodb");
exports.usersRepository = {
    getAllUsers(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;
            const searchFilter = queryDto.searchLoginTerm ? {
                name: {
                    $regex: queryDto.searchLoginTerm,
                    $options: "i",
                }
            } : {}; //если строка поиска пустая - возвращаем все блоги
            const items = yield mongo_db_1.usersCollection //запрос в db
                .find(searchFilter)
                .skip(skip)
                .limit(queryDto.pageSize)
                .sort({ [queryDto.sortBy]: queryDto.sortDirection })
                .toArray();
            const totalCount = yield mongo_db_1.usersCollection.countDocuments(searchFilter); //общее кол-во элементов
            const paramsForFront = {
                pagesCount: Math.ceil(totalCount / queryDto.pageSize),
                page: queryDto.pageNumber,
                pageSize: queryDto.pageSize,
                totalCount: totalCount,
            };
            const userForFront = items.map(map_to_user_view_model_1.mapToUserViewModel);
            return (0, map_user_for_front_1.userForFrontMapper)(userForFront, paramsForFront);
        });
    },
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return mongo_db_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
        });
    },
    createUser(newUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const insertResult = yield mongo_db_1.usersCollection.insertOne(newUser);
            return Object.assign(Object.assign({}, newUser), { _id: insertResult.insertedId });
        });
    },
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedUser = yield mongo_db_1.usersCollection.deleteOne({ _id: new mongodb_1.ObjectId(id) });
            if (deletedUser.deletedCount < 1) {
                throw new Error("Blog not exist");
            }
        });
    }
};
