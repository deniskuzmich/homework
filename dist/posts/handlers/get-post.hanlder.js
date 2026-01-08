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
exports.GetPostHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
class GetPostHandler {
    constructor(postsQueryRepository) {
        this.getPost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postsQueryRepository.getPostById(req.params.id);
                if (!post) {
                    return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
                }
                res.status(http_statuses_1.HttpStatuses.Success).send(post);
            }
            catch (e) {
                return res.sendStatus(http_statuses_1.HttpStatuses.ServerError);
            }
        });
        this.postsQueryRepository = postsQueryRepository;
    }
}
exports.GetPostHandler = GetPostHandler;
