import {injectable} from "inversify";
import {BlogDocument, BlogModel, BlogNewDocument} from "../../entity/blogs.entity";

@injectable()
export class BlogsRepository {
  async save(blog: BlogNewDocument): Promise<BlogDocument> {
    const savedBlog = await blog.save();
    return savedBlog as BlogDocument;
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

