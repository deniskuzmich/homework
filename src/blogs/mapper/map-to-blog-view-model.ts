import {BlogOutput} from "../types/main-types/blog-output.type";
import {BlogDocument} from "../../entity/blogs.entity";

export function mapToBlogViewModel(blog: BlogDocument):BlogOutput  {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}