import {ResultStatus} from "../../src/common/types/result.status";
import express, {Express} from "express";
import {setupApp} from "../../src/setup-app";
import {BLOGS_PATH, TESTING_PATH} from "../../src/core/paths/paths";
import request from "supertest";
import {basicAuthToken} from "../../src/auth/auth-admin/admin-auth-token";
import {runDB, stopDb} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/settings";

describe("Blogs API", () => {
  let app: Express
  const adminToken = basicAuthToken()

  beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL)

    app = express();
    setupApp(app);

    await request(app)
      .delete(`${TESTING_PATH}/${'all-data'}`)
      .expect(ResultStatus.NoContent)
  })

  afterAll(async () => {
    await stopDb();
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
      .expect(ResultStatus.Success, [])
  })

  it('should return 404 for not existing blog', async () => {
    await request(app)
      .get(`${TESTING_PATH}/${testBlogData.id}`)
      .expect(ResultStatus.NotFound)
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
      .expect(ResultStatus.BAD_REQUEST_400)

    await request(app)
      .get(BLOGS_PATH)
      .expect(ResultStatus.Success, [])
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
      .expect(ResultStatus.UNAUTHORIZED_401)

    await request(app)
      .get(BLOGS_PATH)
      .expect(ResultStatus.Success, [])
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
      .expect(ResultStatus.CREATED_201)

    createdBlog = createResponse.body

    await request(app)
      .get(BLOGS_PATH)
      .expect(ResultStatus.Success, [createdBlog])
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
      .expect(ResultStatus.BAD_REQUEST_400)

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .expect(ResultStatus.Success, createdBlog)
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
      .expect(ResultStatus.BAD_REQUEST_400)
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
      .expect(ResultStatus.NoContent)
  })

  it(`should delete blog`, async () => {
    await request(app)
      .delete(`${BLOGS_PATH}/${createdBlog.id}`)
      .set('Authorization', adminToken)
      .expect(ResultStatus.NoContent)

    await request(app)
      .get(`${BLOGS_PATH}/${createdBlog.id}`)
      .expect(ResultStatus.NotFound)

    await request(app)
      .get(BLOGS_PATH)
      .expect(ResultStatus.Success, [])
  })
})
