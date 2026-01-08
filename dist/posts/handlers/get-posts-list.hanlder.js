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
exports.GetPostListHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
const values_pagination_mapper_1 = require("../../common/mapper/values-pagination.mapper");
class GetPostListHandler {
    constructor(postsQueryRepository) {
        this.getPostList = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const queryInput = (0, values_pagination_mapper_1.valuesPaginationMaper)(req.query);
            const foundPosts = yield this.postsQueryRepository.findPosts(queryInput);
            res.status(http_statuses_1.HttpStatuses.Success).send(foundPosts);
        });
        this.postsQueryRepository = postsQueryRepository;
    }
}
exports.GetPostListHandler = GetPostListHandler;
