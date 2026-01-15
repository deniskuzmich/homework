import {injectable} from "inversify";
import {BlogDocument, BlogModel} from "../../entity/blogs.entity";

@injectable()
export class BlogsRepository {
  async save(blog: BlogDocument) {
    await blog.save();
  }

  async getBlogById(id: string): Promise<BlogDocument | null> {
    return BlogModel.findOne({_id: id});
  }

  async deleteBlog(id: string): Promise<void> {
    const deletedBlog = await BlogModel.deleteOne({_id: id});
    if (deletedBlog.deletedCount < 1) {
      return
    }
  }
};

