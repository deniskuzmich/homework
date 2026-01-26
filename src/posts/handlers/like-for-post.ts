import {Request, Response} from "express";
import {inject, injectable} from "inversify";
import {ResultStatus} from "../../common/types/result.status";
import {mapResultCodeToHttpExtension} from "../../common/mapper/mapResultCodeToHttpExtention";
import {PostsService} from "../service/posts.service";

@injectable()
export class LikeForPostHandler {

  constructor(
    @inject(PostsService)
    public postsService: PostsService) {
  }

  async updateLikeStatus(req: Request, res: Response) {
    const postId = req.params.postId;
    const likeStatus = req.body.likeStatus;
    const userId = req.user!.userId;
    const login = req.body.login;

    const result = await this.postsService.updateLikeForPost(postId,userId, likeStatus, login)

    if(result.status === ResultStatus.Success)  {
      return res.status(mapResultCodeToHttpExtension(result.status)).send(result.extensions)
    }

    return res.sendStatus(mapResultCodeToHttpExtension(result.status))
  }
}