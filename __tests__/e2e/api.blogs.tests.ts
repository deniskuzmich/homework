import {HttpStatuses} from "../../src/common/types/http-statuses";
import express, {Express} from "express";
import {setupApp} from "../../src/setup-app";
import {BLOGS_PATH, TESTING_PATH} from "../../src/core/paths/paths";
import request from "supertest";
import {basicAuthToken} from "../../src/auth/auth-admin/admin-auth-token";
import {runDbMongoose, stopDbMongoose,} from "../../src/db/mongo.db";
import {dataWithPagination, paginationWithoutData, testBlogData} from "../../src/utils-for-tests/utils-for-blog-tests";

describe("Blogs API", () => {
  let app: Express
  const adminToken = basicAuthToken()

  beforeAll(async () => {
    await runDbMongoose()

    app = express();
    setupApp(app);

    await request(app)
      .delete(`${TESTING_PATH}/${'all-data'}`)
      .expect(HttpStatuses.NoContent)
  })

  afterAll(async () => {
    await stopDbMongoose();
  })

  it('should return 200 and empty array', async () => {
    await request(app)
      .get(BLOGS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })

  it('should return 404 for not existing blog', async () => {
    await request(app)
      .get(`${TESTING_PATH}/${testBlogData.id}`)
      .expect(HttpStatuses.NotFound)
  })

  it(`should'nt create a blog with incorrect input data`, async () => {
    await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...testBlogData,
        name: "",
        description: "",
        websiteUrl: "",
      })
      .expect(HttpStatuses.BadRequest)

    await request(app)
      .get(BLOGS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })

  it(`should'nt create a blog without Authorization`, async () => {
    await request(app)
      .post(BLOGS_PATH)
      .send({
        ...testBlogData,
        name: "",
        description: "",
        websiteUrl: "",
      })
      .expect(HttpStatuses.Unauthorized)

    await request(app)
      .get(BLOGS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })

  let createdBlog: any = null
  it(`should create blog with correct input data`, async () => {
    const createResponse = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...testBlogData,
        name: "stringName",
        description: "asdawdafsafsdgesg",
        websiteUrl: "https://www.example.com",
      })
      .expect(HttpStatuses.Created)

    createdBlog = createResponse.body

    await request(app)
      .get(BLOGS_PATH)
      .expect(HttpStatuses.Success, dataWithPagination([createdBlog]))
  })

  it(`should'nt update blog with incorrect input data`, async () => {
    await request(app)
      .put(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .send({
        ...testBlogData,
        name: "",
        description: "",
        websiteUrl: "string",
      })
      .expect(HttpStatuses.BadRequest)

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .expect(HttpStatuses.Success, createdBlog)
  })

  it(`should'nt update blog that not exist`, async () => {
    await request(app)
      .put(`${BLOGS_PATH}/${5}`)
      .set('Authorization', adminToken)
      .send({
        ...testBlogData,
        name: "",
        description: "",
        websiteUrl: "https://www.example.com",
      })
      .expect(HttpStatuses.BadRequest)
  })

  it(`should update blog with correct input data`, async () => {
    await request(app)
      .put(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .send({
        ...testBlogData,
        name: "stringName",
        description: "asdawdafsafsdgesg",
        websiteUrl: "https://www.example.com",
      })
      .expect(HttpStatuses.NoContent)
  })

  it(`should delete blog`, async () => {
    await request(app)
      .delete(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatuses.NoContent)

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .expect(HttpStatuses.NotFound)

    await request(app)
      .get(BLOGS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })
})
