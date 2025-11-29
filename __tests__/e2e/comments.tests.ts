import express, {Express} from "express";
import {runDB, stopDb} from "../../src/db/mongo.db";
import {SETTINGS} from "../../src/core/settings/settings";
import {setupApp} from "../../src/setup-app";
import request from "supertest";
import {POSTS_PATH, TESTING_PATH} from "../../src/core/paths/paths";
import {HttpStatuses} from "../../src/common/types/http-statuses";



describe("Comments", () => {
  let app: Express


  beforeAll(async () => {
    await runDB(SETTINGS.MONGO_URL)



    app = express();
    setupApp(app);

    await request(app)
      .delete(`${TESTING_PATH}/${'all-data'}`)
      .expect(HttpStatuses.NoContent)
  })

  afterAll(async () => {
    await stopDb()
  })

  it('Should not create a comment without auth', async () => {
    await request(app)
      .post(`${POSTS_PATH}/${':id/comments'}`)
      .send({
        loginOrEmail: ''
      })
      .expect(HttpStatuses.Unauthorized)
  })

  it('Should create a comment with auth and correct input data', async () => {
    await request(app)
      .post(`${POSTS_PATH}/${':id/comments'}`)
      // .set('Authorization', `Bearer ${}`)
      .send({
        Content: 'blalbalblalblalbal'
      })
      .expect(HttpStatuses.Created)
  });
})