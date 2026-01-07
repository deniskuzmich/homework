import {AuthUserHandler} from "../../auth/auth-user/handler/auth-user.handler";
import {AuthService} from "../../auth/service/auth-service";
import {JwtService} from "../../common/services/jwtService";
import {DeviceService} from "../../devices/service/deviceService";
import {DevicesRepository} from "../../devices/repository/devicesRepository";
import {AuthRefreshTokenHandler} from "../../auth/auth-user/handler/refresh-token.handler";
import {LogoutHandler} from "../../auth/auth-user/handler/logout.handler";
import {UserRegistrationHandler} from "../../auth/auth-user/handler/user-registration.handler";
import {RegistrationConfirmHandler} from "../../auth/auth-user/handler/registration-confirm";
import {EmailResendingHandler} from "../../auth/auth-user/handler/email-resending";
import {AboutMeHandler} from "../../auth/auth-user/handler/auth-me-handler";
import {UpdateBlogHandler} from "../../blogs/handlers/update-blog.hanlder";
import {BlogsService} from "../../blogs/service/blogs.service";
import {BlogsRepository} from "../../blogs/repository/blogs-repository";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {GetBlogsListHandler} from "../../blogs/handlers/get-blogs-list.hanlder";
import {BlogsQueryRepository} from "../../blogs/repository/blogs-query-repository";
import {GetBlogHandler} from "../../blogs/handlers/get-blog.handler";
import {CreateBlogHandler} from "../../blogs/handlers/create-blog.hanlder";
import {DeleteBlogHandler} from "../../blogs/handlers/delete-blog.hanlder";
import {GetPostByBlogIdHandler} from "../../posts/handlers/get-post-by-blog";
import {PostsQueryRepository} from "../../posts/repository/posts-query-repository";
import {CreatePostForBlogHandler} from "../../posts/handlers/create-post-for-blog.handler";
import {GetPostListHandler} from "../../posts/handlers/get-posts-list.hanlder";
import {GetPostHandler} from "../../posts/handlers/get-post.hanlder";
import {UpdatePostHandler} from "../../posts/handlers/update-post.hanlder";
import {PostsService} from "../../posts/service/posts.service";
import {CreatePostsHandler} from "../../posts/handlers/create-posts.hanlder";
import {DeletePostHandler} from "../../posts/handlers/delete-post.hanlder";
import {GetCommentForPostHandler} from "../../comments/handler/get-comment-for-post.handler";
import {CommentsQueryRepository} from "../../comments/repository/comments-query.repository";
import {CreateCommentForPostHandler} from "../../comments/handler/create-comment-for-post.handler";
import {CommentsService} from "../../comments/service/comments.service";
import {CommentsRepository} from "../../comments/repository/comments.repository";
import {GetCommentByIdHandler} from "../../comments/handler/get-comment.handler";
import {UpdateCommentsHandler} from "../../comments/handler/update-comments.handler";
import {DeleteCommentHandler} from "../../comments/handler/delete-comment.handler";
import {GetDevicesHandler} from "../../devices/handler/get-devices.handler";
import {DevicesQueryRepository} from "../../devices/repository/devices-query.repository";
import {DeleteAllDevicesHandler} from "../../devices/handler/delete-all-devices.handler";
import {DeleteOneDeviceHandler} from "../../devices/handler/delete-one-device.handler";
import {GetAllUsers} from "../../users/handlers/get-all-users";
import {UsersQueryRepository} from "../../users/repository/users-query.repository";
import {CreateUserHandler} from "../../users/handlers/create-user";
import {UsersService} from "../../users/service/users.service";
import {BcryptService} from "../../common/services/bcrypt.service";
import {DeleteUserHandler} from "../../users/handlers/delete-user";

export const bcryptService = new BcryptService();

export const getBlogsListHandler = new GetBlogsListHandler()
export const getBlogHandler = new GetBlogHandler();
export const createBlogHandler = new CreateBlogHandler();
export const updateBlogHandler = new UpdateBlogHandler();
export const deleteBlogHandler = new DeleteBlogHandler();
export const blogsQueryRepository = new BlogsQueryRepository();
export const blogsService = new BlogsService();
export const blogsRepository = new BlogsRepository();
export const getPostByBlogIdHandler = new GetPostByBlogIdHandler();

export const postsQueryRepository = new PostsQueryRepository();
export const postsRepository = new PostsRepository();
export const createPostForBlogHandler = new CreatePostForBlogHandler();
export const getPostListHandler = new GetPostListHandler();
export const getPostHandler = new GetPostHandler();
export const updatePostHandler = new UpdatePostHandler();
export const postsService = new PostsService();
export const createPostsHandler = new CreatePostsHandler();
export const deletePostHandler = new DeletePostHandler();
export const getCommentForPostHandler = new GetCommentForPostHandler();

export const commentsQueryRepository = new CommentsQueryRepository();
export const commentsRepository = new CommentsRepository();
export const createCommentForPostHandler = new CreateCommentForPostHandler()
export const commentsService = new CommentsService();
export const getCommentByIdHandler = new GetCommentByIdHandler();
export const updateCommentsHandler = new UpdateCommentsHandler();
export const deleteCommentHandler = new DeleteCommentHandler();

export const getDevicesHandler = new GetDevicesHandler();
export const devicesQueryRepository = new DevicesQueryRepository();
export const deleteAllDevicesHandler = new DeleteAllDevicesHandler();
export const deleteOneDeviceHandler = new DeleteOneDeviceHandler();

export const getAllUsers = new GetAllUsers();
export const usersQueryRepository = new UsersQueryRepository();
export const createUserHandler = new CreateUserHandler();
export const usersService = new UsersService();
export const deleteUserHandler = new DeleteUserHandler();



export const authHandler = new AuthUserHandler();
export const authService = new AuthService();
export const jwtService = new JwtService();
export const deviceService = new DeviceService()
export const devicesRepository = new DevicesRepository();
export const authRefreshTokenHandler = new AuthRefreshTokenHandler();
export const logoutHandler = new LogoutHandler();
export const userRegistrationHandler = new UserRegistrationHandler();
export const registrationConfirmHandler = new RegistrationConfirmHandler();
export const emailResendingHandler = new EmailResendingHandler();
export const aboutMeHandler = new AboutMeHandler();



