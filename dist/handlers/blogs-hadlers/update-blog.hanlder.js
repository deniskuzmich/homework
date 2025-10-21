"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogHandler = updateBlogHandler;
const blogs_repository_1 = require("../../respositories/blogs-repository");
const http_statuses_1 = require("../../http_statuses/http_statuses");
const input_validation_result_middleware_1 = require("../../core/middlewares/validation/input.validation-result.middleware");
function updateBlogHandler(req, res) {
    const blog = blogs_repository_1.blogsRepository.updateBlog(req.params.id, req.body);
    if (!blog) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send((0, input_validation_result_middleware_1.createErrorMessages)([{ field: 'id', message: 'Post is not created' }]));
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
}
