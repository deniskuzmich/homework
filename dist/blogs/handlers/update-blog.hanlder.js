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
exports.updateBlogHandler = updateBlogHandler;
const blogs_service_1 = require("../service/blogs.service");
const http_statuses_1 = require("../../common/types/http-statuses");
function updateBlogHandler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const blog = yield blogs_service_1.blogsService.getBlogById(req.params.id);
        if (!blog) {
            return res.sendStatus(http_statuses_1.HttpStatuses.NotFound);
        }
        yield blogs_service_1.blogsService.updateBlog(req.params.id, req.body);
        return res.sendStatus(http_statuses_1.HttpStatuses.NoContent);
    });
}
