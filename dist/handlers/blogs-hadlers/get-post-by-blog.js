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
exports.getPostByBlogIdHanlder = getPostByBlogIdHanlder;
const blogs_service_1 = require("../../application/blogs.service");
const http_statuses_1 = require("../../core/http_statuses/http_statuses");
function getPostByBlogIdHanlder(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = req.query;
        const posts = yield blogs_service_1.blogsService.getPostByBlogId(req.params.id, query);
        if (!posts) {
            return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        }
        res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(posts);
    });
}
