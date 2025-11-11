"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = require("express");
const users_pagination_validation_1 = require("../users/middleware-validation/users.pagination-validation");
const get_all_users_1 = require("../users/handlers/get-all-users");
const super_admin_guard_middleware_1 = require("../auth/super-admin.guard.middleware");
const post_user_1 = require("../users/handlers/post-user");
const id_validation_middleware_1 = require("../core/middleware-validation/id.validation-middleware");
const delete_user_1 = require("../users/handlers/delete-user");
exports.usersRouter = (0, express_1.Router)();
exports.usersRouter
    .get("", super_admin_guard_middleware_1.superAdminGuardMiddleware, users_pagination_validation_1.userInputDtoValidation, get_all_users_1.getAllUsers)
    .post("", super_admin_guard_middleware_1.superAdminGuardMiddleware, post_user_1.createUserHandler)
    .delete('/:id', super_admin_guard_middleware_1.superAdminGuardMiddleware, id_validation_middleware_1.idValidation, delete_user_1.deleteUserHandler);
