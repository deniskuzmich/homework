"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToBlogListPaginatedOutput = mapToBlogListPaginatedOutput;
const blog_resource_type_1 = require("../../core/types/blogs-types/blog-resource.type");
function mapToBlogListPaginatedOutput(blogs, meta) {
    return {
        meta: {
            page: meta.pageNumber,
            pageSize: meta.pageSize,
            pageCount: Math.ceil(meta.totalCount / meta.pageSize),
            totalCount: meta.totalCount,
        },
        data: blogs.map((blog) => ({
            type: blog_resource_type_1.BlogResourceType.Blogs,
            id: blog._id.toString(),
            attributes: {
                name: blog.name,
                description: blog.description,
                websiteUrl: blog.websiteUrl,
                createdAt: blog.createdAt,
                isMembership: blog.isMembership,
            },
        })),
    };
}
