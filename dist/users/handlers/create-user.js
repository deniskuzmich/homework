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
exports.CreateUserHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
class CreateUserHandler {
    constructor(usersQueryRepository, usersService) {
        this.createUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const result = yield this.usersService.createUser(req.body);
            if ("errorsMessages" in result) {
                return res.status(http_statuses_1.HttpStatuses.BadRequest).send(result);
            }
            const userViewModel = yield this.usersQueryRepository.getUserById(result._id.toString());
            return res.status(http_statuses_1.HttpStatuses.Created).send(userViewModel);
        });
        this.usersQueryRepository = usersQueryRepository;
        this.usersService = usersService;
    }
}
exports.CreateUserHandler = CreateUserHandler;
