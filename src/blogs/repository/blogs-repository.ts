import {Blog} from "../types/main-types/blog-db.type";
import {ObjectId, WithId} from "mongodb";
import {blogsCollection} from "../../db/mongo.db";
import {BlogInputDto} from "../types/input-types/blog.input-dto";

export const blogsRepository = {
  async updateBlog(id: string, newData: BlogInputDto): Promise<void> {
    const updatedBlog = await blogsCollection.updateOne(
      {_id: new ObjectId(id)},
      {
        $set: {
          name: newData.name,
          description: newData.description,
          websiteUrl: newData.websiteUrl
        }
      }
    );
    if (updatedBlog.matchedCount < 1) {
      throw new Error("Blog not exist")
    }
    return
  },
  async createBlog(newBlog: Blog): Promise<WithId<Blog>> {
    const insertResult = await blogsCollection.insertOne(newBlog);
    return {...newBlog, _id: insertResult.insertedId};
  },
  async deleteBlog(id: string): Promise<void> {
    const deletedBlog = await blogsCollection.deleteOne({_id: new ObjectId(id)});
    if (deletedBlog.deletedCount < 1) {
      throw new Error("Blog not exist");
    }
  },
};
