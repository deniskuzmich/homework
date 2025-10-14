import {Router} from "express";
import {db} from "../db/videos";
import {HTTP_STATUSES} from "../http_statuses/http_statuses";
import {createErrorMessages} from "../utils/error.utils";
import {videoInputValidation} from "../validation/videoInputValidation";

export const videoRouter = Router();

  videoRouter.get("", (req, res) => {
    res.status(HTTP_STATUSES.OK_200).send(db.videos);
  });

  videoRouter.get('/:id', (req, res) => {
    const video = db.videos.find((video: any) => video.id === +req.params.id);
    if (!video) {
      return res.sendStatus(HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(HTTP_STATUSES.OK_200).send(video);
  })

  videoRouter.put('/:id', (req, res) => {
    const errors = videoInputValidation(req.body)
    if (!req.body.title) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
      return
    }
    const video = db.videos.find(video => video.id === +req.params.id);
    if (!video) {
      res.sendStatus(HTTP_STATUSES.NOT_FOUND_404).send(createErrorMessages(errors));
      return
    }
    video.title = req.body.title,
      video.author = req.body.author,
      video.canBeDownloaded = req.body.canBeDownloaded,
      video.minAgeRestriction = req.body.minAgeRestriction,
      video.publicationDate = req.body.publicationDate,
      video.availableResolutions = req.body.availableResolutions

    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
  })

  videoRouter.post("", (req, res) => {
    const errors = videoInputValidation(req.body)

    if (errors.length > 0) {
      res.status(HTTP_STATUSES.BAD_REQUEST_400).send(createErrorMessages(errors));
      return
    }
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);

    const newVideo = {
      id: db.videos.length ? db.videos[db.videos.length - 1].id + 1 : 1,
      title: req.body.title,
      author: req.body.author,
      canBeDownloaded: false,
      minAgeRestriction: null,
      createdAt: new Date().toISOString(),
      publicationDate: nextDay.toISOString(),
      availableResolutions: req.body.availableResolutions
    }
    db.videos.push(newVideo);
    res.status(HTTP_STATUSES.CREATED_201).send(newVideo);
  })

  videoRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < db.videos.length; i++) {
      if (db.videos[i].id === +req.params.id) {
        db.videos.splice(i, 1);
        res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
        return
      }
    }
    res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
  })
