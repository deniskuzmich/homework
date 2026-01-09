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
import {PasswordRecovery} from "../../auth/auth-user/handler/password-recovery";
import {NodemailerService} from "../../adapters/nodemailer-service";
import {UsersRepository} from "../../users/repository/usersRepository";
import {NewPasswordHandler} from "../../auth/auth-user/handler/new-password.handler";


export const bcryptService = new BcryptService();
export const jwtService = new JwtService();
export const nodemailerService = new NodemailerService();

export const blogsRepository = new BlogsRepository();
export const blogsQueryRepository = new BlogsQueryRepository();
export const postsRepository = new PostsRepository();
export const postsQueryRepository = new PostsQueryRepository();
export const commentsRepository = new CommentsRepository();
export const commentsQueryRepository = new CommentsQueryRepository();
export const devicesRepository = new DevicesRepository();
export const devicesQueryRepository = new DevicesQueryRepository();
export const usersRepository = new UsersRepository();
export const usersQueryRepository = new UsersQueryRepository();

export const blogsService = new BlogsService(blogsRepository, postsRepository);
export const getBlogsListHandler = new GetBlogsListHandler(blogsQueryRepository)
export const getBlogHandler = new GetBlogHandler(blogsQueryRepository);
export const createBlogHandler = new CreateBlogHandler(blogsService, blogsQueryRepository);
export const updateBlogHandler = new UpdateBlogHandler(blogsService);
export const deleteBlogHandler = new DeleteBlogHandler(blogsService);

export const postsService = new PostsService(postsRepository, blogsRepository);
export const getPostByBlogIdHandler = new GetPostByBlogIdHandler(blogsService, postsQueryRepository);
export const createPostForBlogHandler = new CreatePostForBlogHandler(blogsService, postsQueryRepository);
export const getPostListHandler = new GetPostListHandler(postsQueryRepository);
export const getPostHandler = new GetPostHandler(postsQueryRepository);
export const updatePostHandler = new UpdatePostHandler(postsService);
export const createPostsHandler = new CreatePostsHandler(postsQueryRepository, postsService);
export const deletePostHandler = new DeletePostHandler(postsService);
export const getCommentForPostHandler = new GetCommentForPostHandler(postsService, commentsQueryRepository);


export const commentsService = new CommentsService(commentsQueryRepository, commentsRepository, postsRepository);
export const createCommentForPostHandler = new CreateCommentForPostHandler(commentsService, commentsQueryRepository);
export const getCommentByIdHandler = new GetCommentByIdHandler(commentsQueryRepository);
export const updateCommentsHandler = new UpdateCommentsHandler(commentsService);
export const deleteCommentHandler = new DeleteCommentHandler(commentsService);

export const deviceService = new DeviceService(devicesRepository, jwtService)
export const getDevicesHandler = new GetDevicesHandler(jwtService, devicesQueryRepository);
export const deleteAllDevicesHandler = new DeleteAllDevicesHandler(jwtService, devicesRepository, deviceService);
export const deleteOneDeviceHandler = new DeleteOneDeviceHandler(jwtService, deviceService);

export const usersService = new UsersService(bcryptService, usersRepository);
export const getAllUsers = new GetAllUsers(usersQueryRepository);
export const createUserHandler = new CreateUserHandler(usersQueryRepository, usersService);
export const deleteUserHandler = new DeleteUserHandler(usersService);


export const authService = new AuthService(bcryptService, nodemailerService, usersRepository);
export const authHandler = new AuthUserHandler(authService, jwtService, deviceService);
export const authRefreshTokenHandler = new AuthRefreshTokenHandler(jwtService, deviceService);
export const logoutHandler = new LogoutHandler(jwtService, deviceService);
export const userRegistrationHandler = new UserRegistrationHandler(authService);
export const registrationConfirmHandler = new RegistrationConfirmHandler(authService);
export const emailResendingHandler = new EmailResendingHandler(authService);
export const aboutMeHandler = new AboutMeHandler(authService);

export const newPasswordHandler = new NewPasswordHandler(authService)
export const passwordRecoveryHandler = new PasswordRecovery(authService)



