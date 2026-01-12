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
    try {
      const createdPost = await this.postsService.createPost(req.body);
      if (!createdPost) {
        return res.sendStatus(HttpStatuses.BadRequest);
      }

      const postViewModel = await this.postsQueryRepository.getPostById(createdPost._id.toString())
      res.status(HttpStatuses.Created).send(postViewModel);

    } catch (e: unknown) {
      res.status(HttpStatuses.ServerError);
    }
  }
}

