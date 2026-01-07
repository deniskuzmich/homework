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
exports.UsersQueryRepository = void 0;
const mongodb_1 = require("mongodb");
const mongo_db_1 = require("../../db/mongo.db");
const map_to_user_view_model_1 = require("../mapper/map-to-user-view-model");
const map_user_for_front_1 = require("../mapper/map-user-for-front");
class UsersQueryRepository {
    getAllUsers(queryDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const skip = (queryDto.pageNumber - 1) * queryDto.pageSize;
            let searchFilter = {};
            if (queryDto.searchLoginTerm || queryDto.searchEmailTerm) {
                searchFilter = {
                    $or: [
                        { login: { $regex: queryDto.searchLoginTerm, $options: "i" } },
                        { email: { $regex: queryDto.searchEmailTerm, $options: "i" } },
                    ]
                };
            }
            else if (queryDto.searchLoginTerm) {
                searchFilter = { login: { $regex: queryDto.searchLoginTerm, $options: "i" } };
            }
            else if (queryDto.searchEmailTerm) {
                searchFilter = { email: { $regex: queryDto.searchEmailTerm, $options: "i" } };
            }
            const itemsFromDb = yield mongo_db_1.usersCollection //запрос в db
                .find(searchFilter)
                .skip(skip)
                .limit(queryDto.pageSize)
                .sort({ [queryDto.sortBy]: queryDto.sortDirection }) //ключ: значение
                .toArray();
            const totalCount = yield mongo_db_1.usersCollection.countDocuments(searchFilter); //общее кол-во элементов
            const paramsForFront = {
                pagesCount: Math.ceil(totalCount / queryDto.pageSize),
                page: queryDto.pageNumber,
                pageSize: queryDto.pageSize,
                totalCount: totalCount,
            };
            const userForFront = itemsFromDb.map(map_to_user_view_model_1.mapToUserViewModel);
            return (0, map_user_for_front_1.userForFrontMapper)(userForFront, paramsForFront);
        });
    }
    getUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!mongodb_1.ObjectId.isValid(id))
                return null;
            const user = yield mongo_db_1.usersCollection.findOne({ _id: new mongodb_1.ObjectId(id) });
            if (!user)
                return null;
            return (0, map_to_user_view_model_1.mapToUserViewModel)(user);
        });
    }
}
exports.UsersQueryRepository = UsersQueryRepository;
