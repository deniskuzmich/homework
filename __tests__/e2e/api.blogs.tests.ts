import {HTTP_STATUSES} from "../../src/http_statuses/http_statuses";
import express from "express";
import {setupApp} from "../../src/setup-app";
import {BLOGS_PATH, TESTING_PATH} from "../../src/core/paths/paths";
import request from "supertest";
import {basicAuthToken} from "../../src/utils/admin-auth-token";

describe("Blogs API", () => {
  const app = express();
  setupApp(app);

  const adminToken = basicAuthToken()

  beforeAll(async () => {
    await request(app)
      .delete(`${TESTING_PATH}/${'all-data'}`)
      .expect(HTTP_STATUSES.NO_CONTENT_204)
  })

  const testBlogData = {
    id: "3",
    name: "someName",
    description: "loloooloo",
    websiteUrl: "string",
  };

  it('should return 200 and empty array', async () => {
    await request(app)
      .get(BLOGS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
  })

  it('should return 404 for not existing blog', async () => {
    await request(app)
      .get(`${TESTING_PATH}/${testBlogData.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404)
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
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get(BLOGS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
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
      .expect(HTTP_STATUSES.UNAUTHORIZED_401)

    await request(app)
      .get(BLOGS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
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
      .expect(HTTP_STATUSES.CREATED_201)

    createdBlog = createResponse.body

    await request(app)
      .get(BLOGS_PATH)
      .expect(HTTP_STATUSES.OK_200, [createdBlog])
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
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .expect(HTTP_STATUSES.OK_200, createdBlog)
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
      .expect(HTTP_STATUSES.BAD_REQUEST_400)
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
      .expect(HTTP_STATUSES.NO_CONTENT_204)
  })

  it(`should delete blog`, async () => {
    await request(app)
      .delete(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(HTTP_STATUSES.NO_CONTENT_204)

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .expect(HTTP_STATUSES.NOT_FOUND_404)

    await request(app)
      .get(BLOGS_PATH)
      .expect(HTTP_STATUSES.OK_200, [])
  })
})
