import {injectable} from "inversify";
import {PostDocument, PostModel} from "../../entity/posts.entity";

@injectable()
export class PostsRepository {
  async save(post: PostDocument): Promise<PostDocument> {
    return await post.save();
  }

  async getPostById(id: string): Promise<PostDocument | null> {
    return PostModel.findOne({_id: id});
  }
  async deletePost(id: string) {
    const deletedPost = await PostModel.deleteOne({_id: id});
    if (deletedPost.deletedCount < 1) {
      return
    }
  }
};

