// import request from "supertest";
// import {app} from "../../src";
// import {HTTP_STATUSES} from "../../src/http_statuses/http_statuses";
//
//
// describe("/hometask_01/api/videos", () => {
//
//   beforeAll(async () => {
//     await request(app)
//       .delete('/testing/all-data')
//       .expect(HTTP_STATUSES.NO_CONTENT_204)
//   })
//
//   const testVideoData = {
//     id: 3,
//     title: "string",
//     author: "string",
//     canBeDownloaded: true,
//     minAgeRestriction: null,
//     createdAt: "2025-10-11T12:30:43.227Z",
//     publicationDate: "2025-10-11T12:30:43.227Z",
//     availableResolutions: [
//       "P144"
//     ]
//   };
//   it('should return 200 and empty array', async () => {
//     await request(app)
//       .get('/videos')
//       .expect(HTTP_STATUSES.OK_200, [])
//   })
//
//   it('should return 404 for not existing video', async () => {
//     await request(app)
//       .get('/videos/1')
//       .expect(HTTP_STATUSES.NOT_FOUND_404)
//   })
//
//   it(`should'nt create video with incorrect input data`, async () => {
//     await request(app)
//       .post('/videos')
//       .send({
//         ...testVideoData,
//         title: "",
//         author: "",
//         availableResolutions: []
//       })
//       .expect(HTTP_STATUSES.BAD_REQUEST_400)
//
//     await request(app)
//       .get('/videos')
//       .expect(HTTP_STATUSES.OK_200, [])
//   })
//
//   let createdVideo: any = null
//   it(`should create video with correct input data`, async () => {
//     const createResponse = await request(app)
//       .post('/videos')
//       .send({
//         ...testVideoData,
//         title: "string",
//         author: "string",
//         availableResolutions: [
//           "P144"
//         ]
//       })
//       .expect(HTTP_STATUSES.CREATED_201)
//
//     createdVideo = createResponse.body
//
//     await request(app)
//       .get('/videos')
//       .expect(HTTP_STATUSES.OK_200, [createdVideo])
//   })
//
//   it(`should'nt update video with incorrect input data`, async () => {
//     await request(app)
//       .put('/videos/' + createdVideo.id)
//       .send({
//         ...testVideoData,
//         title: "",
//         author: "",
//         availableResolutions: [
//           ""
//         ]
//       })
//       .expect(HTTP_STATUSES.BAD_REQUEST_400)
//
//     await request(app)
//       .get('/videos/' + createdVideo.id)
//       .expect(HTTP_STATUSES.OK_200, createdVideo)
//   })
//
//   it(`should'nt update video that not exist`, async () => {
//     await request(app)
//       .put('/videos/' + 2)
//       .send({
//         ...testVideoData,
//         title: "string",
//         author: "string",
//         availableResolutions: [
//           "P144"
//         ]
//       })
//       .expect(HTTP_STATUSES.NOT_FOUND_404)
//   })
//
//   it(`should update video with correct input data`, async () => {
//     await request(app)
//       .put('/videos/' + createdVideo.id)
//       .send({
//         ...testVideoData,
//         title: "string",
//         author: "string",
//         availableResolutions: [
//           "P144"
//         ]
//       })
//       .expect(HTTP_STATUSES.NO_CONTENT_204)
//   })
//
//   it(`should delete video`, async () => {
//     await request(app)
//       .delete('/videos/' + createdVideo.id)
//       .expect(HTTP_STATUSES.NO_CONTENT_204)
//
//     await request(app)
//       .get('/videos/' + createdVideo.id)
//       .expect(HTTP_STATUSES.NOT_FOUND_404)
//
//     await request(app)
//       .get('/videos')
//       .expect(HTTP_STATUSES.OK_200, [])
//   })
// })
