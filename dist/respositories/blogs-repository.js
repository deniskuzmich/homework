"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const in_memory_db_1 = require("../db/in-memory.db.");
exports.blogsRepository = {
    findBlogs(name) {
        if (name) {
            let filteredBlogs = in_memory_db_1.db.blogs.filter((blog) => blog.name.indexOf(name) > -1);
            return filteredBlogs;
        }
        else {
            return in_memory_db_1.db.blogs;
        }
    },
    getBlogById(id) {
        const blog = in_memory_db_1.db.blogs.find((blog) => blog.id === id);
        return blog;
    },
    updateBlog(id, data) {
        const blog = in_memory_db_1.db.blogs.find((blog) => blog.id === id);
        if (!blog) {
            throw new Error("Blog not found");
        }
        ((blog.name = data.name),
            (blog.description = data.description),
            (blog.websiteUrl = data.websiteUrl));
        return blog;
    },
    createBlog(blog) {
        const newBlog = {
            id: (in_memory_db_1.db.blogs.length
                ? in_memory_db_1.db.blogs[in_memory_db_1.db.blogs.length - 1].id + 1
                : 1).toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
        };
        in_memory_db_1.db.blogs.push(newBlog);
        return newBlog;
    },
    deleteBlog(id) {
        for (let i = 0; i < in_memory_db_1.db.blogs.length; i++) {
            if (in_memory_db_1.db.blogs[i].id === id) {
                in_memory_db_1.db.blogs.splice(i, 1);
                return true;
            }
        }
    },
};
