import { db } from "../db/in-memory.db.";
import { Blog } from "../core/types/blogs-types";

export const blogsRepository = {
  findBlogs(name: string | null | undefined) {
    if (name) {
      let filteredBlogs = db.blogs.filter(
        (blog) => blog.name.indexOf(name) > -1,
      );
      return filteredBlogs;
    } else {
      return db.blogs;
    }
  },
  getBlogById(id: string) {
    const blog = db.blogs.find((blog) => blog.id === id);
    return blog;
  },
  updateBlog(id: string, data: Blog) {
    const blog = db.blogs.find((blog) => blog.id === id);
    if (!blog) {
      return false
    }
      (blog.name = data.name),
      (blog.description = data.description),
      (blog.websiteUrl = data.websiteUrl);

    return blog;
  },
  createBlog(newBlog: Blog) {
    db.blogs.push(newBlog);
    return newBlog;
  },
  deleteBlog(id: string) {
      for (let i = 0; i < db.blogs.length; i++) {
        if (db.blogs[i].id === id) {
          db.blogs.splice(i, 1);
          return true;
        }
      }
    },
};
