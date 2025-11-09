import {Blog} from "../types/main-types/blog-db.type";
import {WithId} from "mongodb";
import {BlogOutput} from "../types/main-types/blog-output.type";

export function mapToBlogViewModel(blog: WithId<Blog>):BlogOutput  {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}