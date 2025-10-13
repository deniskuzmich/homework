import request from "supertest";
import {HTTP_STATUSES} from "../../src/http_statuses/http_statuses";
import {VideoInputDto} from "../../src/video-input-types/video.input-dto";
import {availableResolution} from "../../src/types/video-types";
import {setupApp} from "../../src/setup-app";
import {app} from "../../src";


describe("Video API body validation check", () => {
  setupApp(app);

  beforeAll(async () => {
    await request(app)
      .delete('/testing/all-data')
      .expect(HTTP_STATUSES.NO_CONTENT_204)
  })

  const testBodyVideoData: VideoInputDto = {
    id: 3,
    title: "string",
    author: "string",
    canBeDownloaded: true,
    minAgeRestriction: null,
    createdAt: "2025-10-11T12:30:43.227Z",
    publicationDate: "2025-10-11T12:30:43.227Z",
    availableResolutions: [availableResolution.P144]
  };

  it(`should'nt create a video with incorrect body data`, async () => {
    const invalidVideoData = await request(app)
      .post('/videos')
      .send({
        ...testBodyVideoData,
        title: "",
        author: "",
        minAgeRestriction: '',
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    expect(invalidVideoData.body.errorsMessages).toHaveLength(3) //Waiting for 3 mistakes

    const videoListResponse = await request(app).get(`/videos`);
    expect(videoListResponse.body).toHaveLength(0)
  })

  it(`should'nt create a video with incorrect body length`, async () => {
    const invalidDataLength = await request(app)
      .post('/videos')
      .send({
        ...testBodyVideoData,
        title: "qwertyuioplkjhgfdsaqwefgbgergjcmhcfiuewhf",
        author: "qwertyuioplkjhgfdsaqwefgbgergjcmhcfiuewhf",
        minAgeRestriction: 19,
      })
      .expect(HTTP_STATUSES.BAD_REQUEST_400)

    expect(invalidDataLength.body.errorsMessages).toHaveLength(3)

    const videoListResponse = await request(app).get(`/videos`);
    expect(videoListResponse.body).toHaveLength(0)
  })

})
