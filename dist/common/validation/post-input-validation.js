"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postInputDtoValidation = void 0;
const posts_input_validation_middleware_1 = require("../../core/middlewares/validation/posts.validation-middleware/posts.input.validation-middleware");
exports.postInputDtoValidation = [
    posts_input_validation_middleware_1.titleValidation,
    posts_input_validation_middleware_1.shortDescriptionValidation,
    posts_input_validation_middleware_1.contentValidation,
];
