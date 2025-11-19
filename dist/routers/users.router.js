"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_pagination_validation_1 = require("../users/middleware-validation/users.pagination-validation");
const get_all_users_1 = require("../users/handlers/get-all-users");
const super_admin_guard_middleware_1 = require("../auth/super-admin.guard.middleware");
const create_user_1 = require("../users/handlers/create-user");
const id_validation_middleware_1 = require("../core/middleware-validation/id.validation-middleware");
const delete_user_1 = require("../users/handlers/delete-user");
const pagination_validation_1 = require("../common/validation/pagination-validation");
const users_input_validation_1 = require("../users/middleware-validation/users-input.validation");
const input_validation_result_middleware_1 = require("../core/middleware-validation/input.validation-result.middleware");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter
    .get("", super_admin_guard_middleware_1.superAdminGuardMiddleware, users_pagination_validation_1.userInputDtoValidation, pagination_validation_1.paginationValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, get_all_users_1.getAllUsers)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, users_input_validation_1.userInputValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, create_user_1.createUserHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, input_validation_result_middleware_1.inputValidationResultMiddleware, delete_user_1.deleteUserHandler);
