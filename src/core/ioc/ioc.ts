import 'reflect-metadata'
import { Container } from 'inversify';
import {AuthUserHandler} from "../../auth/auth-user/handler/auth-user.handler";
import {JwtService} from "../../common/services/jwtService";
import {DeviceService} from "../../devices/service/deviceService";
import {GetBlogsListHandler} from "../../blogs/handlers/get-blogs-list.hanlder";
import {BlogsQueryRepository} from "../../blogs/repository/blogs-query-repository";
import {GetBlogHandler} from "../../blogs/handlers/get-blog.handler";
import {UpdateBlogHandler} from "../../blogs/handlers/update-blog.hanlder";
import {BlogsService} from "../../blogs/service/blogs.service";
import {PostsRepository} from "../../posts/repository/posts-repository";
import {BlogsRepository} from "../../blogs/repository/blogs-repository";
import {CreateBlogHandler} from "../../blogs/handlers/create-blog.hanlder";
import {DeleteBlogHandler} from "../../blogs/handlers/delete-blog.hanlder";
import {GetPostByBlogIdHandler} from "../../posts/handlers/get-post-by-blog";
import {CreatePostForBlogHandler} from "../../posts/handlers/create-post-for-blog.handler";
import {PostsQueryRepository} from "../../posts/repository/posts-query-repository";
import {GetPostListHandler} from "../../posts/handlers/get-posts-list.hanlder";
import {GetPostHandler} from "../../posts/handlers/get-post.hanlder";
import {UpdatePostHandler} from "../../posts/handlers/update-post.hanlder";
import {PostsService} from "../../posts/service/posts.service";
import {CreatePostsHandler} from "../../posts/handlers/create-posts.hanlder";
import {DeletePostHandler} from "../../posts/handlers/delete-post.hanlder";
import {GetCommentForPostHandler} from "../../comments/handler/get-comment-for-post.handler";
import {CreateCommentForPostHandler} from "../../comments/handler/create-comment-for-post.handler";
import {CommentsService} from "../../comments/service/comments.service";
import {GetCommentByIdHandler} from "../../comments/handler/get-comment.handler";
import {UpdateCommentsHandler} from "../../comments/handler/update-comments.handler";
import {DeleteCommentHandler} from "../../comments/handler/delete-comment.handler";
import {CommentsRepository} from "../../comments/repository/comments.repository";
import {CommentsQueryRepository} from "../../comments/repository/comments-query.repository";
import {GetAllUsers} from "../../users/handlers/get-all-users";
import {UsersQueryRepository} from "../../users/repository/users-query.repository";
import {CreateUserHandler} from "../../users/handlers/create-user";
import {UsersService} from "../../users/service/users.service";
import {BcryptService} from "../../common/services/bcrypt.service";
import {UsersRepository} from "../../users/repository/usersRepository";
import {DeleteUserHandler} from "../../users/handlers/delete-user";
import {AuthService} from "../../auth/service/auth-service";
import {NodemailerService} from "../../adapters/nodemailer-service";
import {AuthRefreshTokenHandler} from "../../auth/auth-user/handler/refresh-token.handler";
import {LogoutHandler} from "../../auth/auth-user/handler/logout.handler";
import {UserRegistrationHandler} from "../../auth/auth-user/handler/user-registration.handler";
import {RegistrationConfirmHandler} from "../../auth/auth-user/handler/registration-confirm";
import {EmailResendingHandler} from "../../auth/auth-user/handler/email-resending";
import {PasswordRecovery} from "../../auth/auth-user/handler/password-recovery";
import {NewPasswordHandler} from "../../auth/auth-user/handler/new-password.handler";
import {AboutMeHandler} from "../../auth/auth-user/handler/auth-me-handler";
import {DevicesQueryRepository} from "../../devices/repository/devices-query.repository";
import {GetDevicesHandler} from "../../devices/handler/get-devices.handler";
import {DevicesRepository} from "../../devices/repository/devicesRepository";
import {DeleteAllDevicesHandler} from "../../devices/handler/delete-all-devices.handler";
import {DeleteOneDeviceHandler} from "../../devices/handler/delete-one-device.handler";


export const container = new Container();

container.bind(BcryptService).to(BcryptService);
container.bind(JwtService).to(JwtService);
container.bind(NodemailerService).to(NodemailerService);

container.bind(BlogsQueryRepository).to(BlogsQueryRepository);
container.bind(BlogsRepository).to(BlogsRepository);
container.bind(BlogsService).to(BlogsService)
container.bind(GetBlogsListHandler).to(GetBlogsListHandler)
container.bind(GetBlogHandler).to(GetBlogHandler)
container.bind(UpdateBlogHandler).to(UpdateBlogHandler)
container.bind(CreateBlogHandler).to(CreateBlogHandler)
container.bind(DeleteBlogHandler).to(DeleteBlogHandler)
container.bind(GetPostByBlogIdHandler).to(GetPostByBlogIdHandler)
container.bind(CreatePostForBlogHandler).to(CreatePostForBlogHandler)

container.bind(PostsQueryRepository).to(PostsQueryRepository)
container.bind(PostsRepository).to(PostsRepository)
container.bind(PostsService).to(PostsService)
container.bind(GetPostListHandler).to(GetPostListHandler)
container.bind(GetPostHandler).to(GetPostHandler)
container.bind(UpdatePostHandler).to(UpdatePostHandler)
container.bind(CreatePostsHandler).to(CreatePostsHandler)
container.bind(DeletePostHandler).to(DeletePostHandler)
container.bind(GetCommentForPostHandler).to(GetCommentForPostHandler)
container.bind(CreateCommentForPostHandler).to(CreateCommentForPostHandler)

container.bind(CommentsQueryRepository).to(CommentsQueryRepository)
container.bind(CommentsRepository).to(CommentsRepository)
container.bind(CommentsService).to(CommentsService)
container.bind(GetCommentByIdHandler).to(GetCommentByIdHandler)
container.bind(UpdateCommentsHandler).to(UpdateCommentsHandler)
container.bind(DeleteCommentHandler).to(DeleteCommentHandler)

container.bind(UsersQueryRepository).to(UsersQueryRepository)
container.bind(UsersRepository).to(UsersRepository)
container.bind(UsersService).to(UsersService)
container.bind(GetAllUsers).to(GetAllUsers)
container.bind(CreateUserHandler).to(CreateUserHandler)
container.bind(DeleteUserHandler).to(DeleteUserHandler)

container.bind(AuthUserHandler).to(AuthUserHandler);
container.bind(AuthService).to(AuthService);
container.bind(AuthRefreshTokenHandler).to(AuthRefreshTokenHandler);
container.bind(LogoutHandler).to(LogoutHandler);
container.bind(UserRegistrationHandler).to(UserRegistrationHandler);
container.bind(RegistrationConfirmHandler).to(RegistrationConfirmHandler);
container.bind(EmailResendingHandler).to(EmailResendingHandler);
container.bind(PasswordRecovery).to(PasswordRecovery);
container.bind(NewPasswordHandler).to(NewPasswordHandler);
container.bind(AboutMeHandler).to(AboutMeHandler);

container.bind(DevicesQueryRepository).to(DevicesQueryRepository);
container.bind(DevicesRepository).to(DevicesRepository);
container.bind(DeviceService).to(DeviceService);
container.bind(GetDevicesHandler).to(GetDevicesHandler);
container.bind(DeleteAllDevicesHandler).to(DeleteAllDevicesHandler);
container.bind(DeleteOneDeviceHandler).to(DeleteOneDeviceHandler);
