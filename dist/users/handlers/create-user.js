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
exports.createUserHandler = createUserHandler;
const map_to_user_view_model_1 = require("../mapper/map-to-user-view-model");
const users_service_1 = require("../service/users.service");
const http_statuses_1 = require("../../common/types/http-statuses");
function createUserHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield users_service_1.usersService.createUser(req.body);
        if ("errorsMessages" in result) {
            return res.status(http_statuses_1.HttpStatuses.BadRequest).send(result);
        }
        const userViewModel = (0, map_to_user_view_model_1.mapToUserViewModel)(result);
        return res.status(http_statuses_1.HttpStatuses.Created).send(userViewModel);
    });
}
//create export const valuesPaginationMaperForUsers = (query: QueryInputForPagination): BlogInputWithoutSearch => {
//   return {
//     pageNumber: query.pageNumber ? Number(query.pageNumber) : 1,
//     pageSize: query.pageSize ? Number(query.pageSize) : 10,
//     sortBy: query.sortBy ?? 'createdAt',
//     sortDirection: query.sortDirection ?? 'desc',
//   }
// }
