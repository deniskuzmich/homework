import {Router} from "express";
import {userInputDtoValidation} from "../users/middleware-validation/users.pagination-validation";
import {superAdminGuardMiddleware} from "../auth/auth-admin/super-admin.guard.middleware";
import {idValidation} from "../common/middleware-validation/id.validation-middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {userInputValidation} from "../users/middleware-validation/users-input.validation";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {createUserHandler, deleteUserHandler, getAllUsers} from "../core/composition/composition-root";

export const usersRouter = Router();

usersRouter
  .get("", superAdminGuardMiddleware, userInputDtoValidation, paginationValidation, inputValidationResultMiddleware, getAllUsers.getAll)

  .post("", superAdminGuardMiddleware, userInputValidation, inputValidationResultMiddleware, createUserHandler.createUser)

  .delete('/:id', superAdminGuardMiddleware, idValidation, inputValidationResultMiddleware, deleteUserHandler.delete)