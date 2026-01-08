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
exports.UpdatePostHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
class UpdatePostHandler {
    constructor(postsService) {
        this.updatePost = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const post = yield this.postsService.getPostById(req.params.id);
                if (!post) {
                    return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
                }
                yield this.postsService.updatePost(req.params.id, req.body);
                return res.sendStatus(http_statuses_1.HttpStatuses.NoContent);
            }
            catch (e) {
                return res.sendStatus(http_statuses_1.HttpStatuses.ServerError);
            }
        });
        this.postsService = postsService;
    }
}
exports.UpdatePostHandler = UpdatePostHandler;
