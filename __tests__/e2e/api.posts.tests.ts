import express, {Express} from "express";
import {setupApp} from "../../src/setup-app";
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from "../../src/core/paths/paths";
import request from "supertest";
import {basicAuthToken} from "../../src/auth/auth-admin/admin-auth-token";
import {runDB, stopDb} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/settings";
import {HttpStatuses} from "../../src/common/types/http-statuses";
import {dataWithPagination, paginationWithoutData, testPostData} from "../../src/utils-for-tests/utils-for-posts-tests";

describe("Posts API", () => {
  let app: Express;
  const adminToken = basicAuthToken()

  beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL)

    app = express();
    setupApp(app);

    await request(app)
      .delete(`${TESTING_PATH}/${'all-data'}`)
      .expect(HttpStatuses.NoContent)
  })

  afterAll(async () => {
    await stopDb();
  })

  it('should return 200 and empty array', async () => {
    await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })

  it('should return 404 for not existing post', async () => {
    await request(app)
      .get(`${TESTING_PATH}/${testPostData.id}`)
      .expect(HttpStatuses.NotFound)
  })

  it(`should'nt create a post with incorrect input data`, async () => {
    await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "",
      })
      .expect(HttpStatuses.BadRequest)

    await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })

  it(`should'nt create a post without Authorization`, async () => {
    await request(app)
      .post(POSTS_PATH)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "",
      })
      .expect(HttpStatuses.Unauthorized)

    await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })

  let createdPost: any = null
  let createdBlog: any = null

  ///blog for create post
  it('should create blog before posts', async () => {
    const blogResponse = await request(app)
      .post(BLOGS_PATH)
      .set('Authorization', adminToken)
      .send({
        name: "Test Blog",
        description: "Some description",
        websiteUrl: "https://example.com"
      })
      .expect(HttpStatuses.Created)

    createdBlog = blogResponse.body
  })
  //////
  it(`should create post with correct input data`, async () => {
    const createResponse = await request(app)
      .post(POSTS_PATH)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "asdadwdwad",
        shortDescription: "awdawdawd",
        content: "adawdaadawdwadwdsadawdsdd",
        blogId: createdBlog.id,
        blogName: "string",
      })
      .expect(HttpStatuses.Created)

    createdPost = createResponse.body

    await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatuses.Success, dataWithPagination([createdPost]))
  })

  it(`should'nt update post with incorrect input data`, async () => {
    await request(app)
      .put(`${POSTS_PATH}/${createdPost.id}`)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "adawdasdd",
      })
      .expect(HttpStatuses.BadRequest)

    await request(app)
      .get(`${POSTS_PATH}/${createdPost.id}`)
      .expect(HttpStatuses.Success, createdPost)
  })

  it(`should'nt update post that not exist`, async () => {
    await request(app)
      .put(`${POSTS_PATH}/${10}`)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "",
        shortDescription: "",
        content: "adawdasdd",
      })
      .expect(HttpStatuses.BadRequest)
  })

  it(`should update post with correct input data`, async () => {
    await request(app)
      .put(`${POSTS_PATH}/${createdPost.id}`)
      .set('Authorization', adminToken)
      .send({
        ...testPostData,
        title: "adsadaw",
        shortDescription: "adsdawdasdadwad",
        content: "adawdasdsggdglkhkiumh,ojiojk",
      })
      .expect(HttpStatuses.NoContent)
  })

  it(`should delete post`, async () => {
    await request(app)
      .delete(`${POSTS_PATH}/${createdPost.id}`)
      .set('Authorization', adminToken)
      .expect(HttpStatuses.NoContent)

    await request(app)
      .get(`${POSTS_PATH}/${createdPost.id}`)
      .expect(HttpStatuses.NotFound)

    await request(app)
      .get(POSTS_PATH)
      .expect(HttpStatuses.Success, paginationWithoutData)
  })
})
