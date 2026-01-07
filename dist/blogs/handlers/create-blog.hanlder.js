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
exports.CreateBlogHandler = void 0;
const http_statuses_1 = require("../../common/types/http-statuses");
const composition_root_1 = require("../../core/composition/composition-root");
class CreateBlogHandler {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdBlog = yield composition_root_1.blogsService.createBlog(req.body);
            if (!createdBlog) {
                res.status(http_statuses_1.HttpStatuses.BadRequest);
            }
            const blogViewModel = yield composition_root_1.blogsQueryRepository.getBlogById(createdBlog._id.toString());
            res.status(http_statuses_1.HttpStatuses.Created).send(blogViewModel);
        });
    }
}
exports.CreateBlogHandler = CreateBlogHandler;
