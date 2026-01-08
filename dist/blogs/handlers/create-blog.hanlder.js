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
class CreateBlogHandler {
    constructor(blogsService, blogsQueryRepository) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const createdBlog = yield this.blogsService.createBlog(req.body);
            if (!createdBlog) {
                res.status(http_statuses_1.HttpStatuses.BadRequest);
            }
            const blogViewModel = yield this.blogsQueryRepository.getBlogById(createdBlog._id.toString());
            res.status(http_statuses_1.HttpStatuses.Created).send(blogViewModel);
        });
        this.blogsService = blogsService;
        this.blogsQueryRepository = blogsQueryRepository;
    }
}
exports.CreateBlogHandler = CreateBlogHandler;
