import {Request, Response} from "express";
import {PostInputDto} from "../types/main-types/post.input-dto";
import {HttpStatuses} from "../../common/types/http-statuses";
import {PostsQueryRepository} from "../repository/posts-query-repository";
import {PostsService} from "../service/posts.service";
import {inject, injectable} from "inversify";

@injectable()
export class CreatePostsHandler {

  constructor(
    @inject(PostsQueryRepository)
    public postsQueryRepository: PostsQueryRepository,
    @inject(PostsService)
    public postsService: PostsService) {
  }

  async createPost(req: Request<{}, {}, PostInputDto>, res: Response) {
    const userId = req.user?.userId

    try {
      const postId = await this.postsService.createPost(req.body);
      if (!postId) {
        return res.sendStatus(HttpStatuses.BadRequest);
      }

      const postViewModel = await this.postsQueryRepository.getPostById(postId, userId!)
      return res.status(HttpStatuses.Created).send(postViewModel);

    } catch (e: unknown) {
     return res.sendStatus(HttpStatuses.ServerError);
    }
  }
}

