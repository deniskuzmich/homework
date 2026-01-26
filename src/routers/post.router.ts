import {Router} from "express";
import {idValidation} from "../common/middleware-validation/id.validation-middleware";
import {inputValidationResultMiddleware} from "../common/middleware-validation/input.validation-result.middleware";
import {postInputValidation} from "../posts/middleware-validation/posts.input.validation-middleware";
import {superAdminGuardMiddleware} from "../auth/auth-admin/super-admin.guard.middleware";
import {paginationValidation} from "../common/validation/pagination-validation";
import {contentValidation} from "../comments/validation/comments-validation";
import {container} from "../core/ioc/ioc";
import {GetPostListHandler} from "../posts/handlers/get-posts-list.hanlder";
import {GetPostHandler} from "../posts/handlers/get-post.hanlder";
import {UpdatePostHandler} from "../posts/handlers/update-post.hanlder";
import {CreatePostsHandler} from "../posts/handlers/create-posts.hanlder";
import {DeletePostHandler} from "../posts/handlers/delete-post.hanlder";
import {GetCommentForPostHandler} from "../comments/handler/get-comment-for-post.handler";
import {CreateCommentForPostHandler} from "../comments/handler/create-comment-for-post.handler";
import {AuthMiddleWare} from "../auth/middleware/auth.middleware";
import {softAuthMiddleware} from "../common/middleware-validation/soft-auth-middleware";
import {LikeForPostHandler} from "../posts/handlers/like-for-post";

const getPostListHandler = container.get(GetPostListHandler);
const getPostHandler = container.get(GetPostHandler);
const updatePostHandler = container.get(UpdatePostHandler);
const createPostsHandler = container.get(CreatePostsHandler);
const deletePostHandler = container.get(DeletePostHandler);
const getCommentForPostHandler = container.get(GetCommentForPostHandler);
const createCommentForPostHandler = container.get(CreateCommentForPostHandler);
const authMiddleware = container.get(AuthMiddleWare);
const likeForPostHandler = container.get(LikeForPostHandler);

export const postRouter = Router();
postRouter
  .get("",
    softAuthMiddleware,
    paginationValidation,
    getPostListHandler.getPostList.bind(getPostListHandler))

  .get("/:id",
    softAuthMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    getPostHandler.getPost.bind(getPostHandler))

  .put(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    postInputValidation,
    inputValidationResultMiddleware,
    updatePostHandler.updatePost.bind(updatePostHandler),
  )

  .put(
    '/:id/like-status',
    authMiddleware.authMiddleWare.bind(authMiddleware),
    idValidation,
    inputValidationResultMiddleware,
    likeForPostHandler.updateLikeStatus.bind(likeForPostHandler),
  )

  .post(
    "",
    superAdminGuardMiddleware,
    postInputValidation,
    inputValidationResultMiddleware,
    createPostsHandler.createPost.bind(createPostsHandler),
  )

  .delete(
    "/:id",
    superAdminGuardMiddleware,
    idValidation,
    inputValidationResultMiddleware,
    deletePostHandler.deletePost.bind(deletePostHandler),
  )

  .get('/:id/comments',
    softAuthMiddleware,
    idValidation,
    paginationValidation,
    inputValidationResultMiddleware,
    getCommentForPostHandler.getComment.bind(getCommentForPostHandler))

  .post('/:id/comments',
    authMiddleware.authMiddleWare.bind(authMiddleware),
    contentValidation,
    inputValidationResultMiddleware,
    createCommentForPostHandler.createComment.bind(createCommentForPostHandler))



