import express, {Express} from "express";
import {db} from "./db/videos";


export const setupApp = (app: Express) => {
  app.use(express.json()); // middleware для парсинга JSON в теле запроса

  app.get("/hometask_01/api/videos", (req, res) => {
    res.status(200).send(db.videos);
  });

  app.get('/hometask_01/api/videos/:id', (req, res) => {
    const video = db.videos.find((video: any) => video.id === +req.params.id);
    if (!video) {
      return res.status(404).send("No video found.");
    }
    res.status(200).send(video);
  })

  app.put('/hometask_01/api/videos/:id', (req, res) => {
    const video = db.videos.find((video: any) => video.id === +req.params.id);
    if (video) {
        video.title = req.body.title,
        video.author = req.body.author,
        video.canBeDownloaded = req.body.canBeDownloaded,
        video.minAgeRestriction = req.body.minAgeRestriction,
        video.publicationDate = req.body.publicationDate,
        video.availableResolutions = req.body.availableResolutions
    }
    res.status(200).send(video);
  })

  app.post("/hometask_01/api/videos", (req, res) => {
    const newVideo = {
      id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: "2025-10-10T11:01:46.525Z",
      publicationDate: "2025-10-10T11:01:46.525Z",
      availableResolutions: [
        "P144"
      ]
    }
    db.videos.push(newVideo);
    res.status(201).send(newVideo);
  })

  app.delete('/hometask_01/api/videos/:id', (req, res) => {
    for (let i = 0; i < db.videos.length; i++) {
      if (db.videos[i].id === +req.params.id) {
        db.videos.splice(i, 1);
        res.sendStatus(204)
        return
      }
    }
    res.sendStatus(404)
  })

  return app;
};