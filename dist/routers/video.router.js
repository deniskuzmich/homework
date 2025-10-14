"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoRouter = void 0;
const express_1 = require("express");
const videos_1 = require("../db/videos");
const http_statuses_1 = require("../http_statuses/http_statuses");
const error_utils_1 = require("../utils/error.utils");
const videoInputValidation_1 = require("../validation/videoInputValidation");
exports.videoRouter = (0, express_1.Router)();
exports.videoRouter.get("", (req, res) => {
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(videos_1.db.videos);
});
exports.videoRouter.get('/:id', (req, res) => {
    const video = videos_1.db.videos.find((video) => video.id === +req.params.id);
    if (!video) {
        return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    }
    res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(video);
});
exports.videoRouter.put('/:id', (req, res) => {
    const errors = (0, videoInputValidation_1.videoInputValidation)(req.body);
    if (!req.body.title) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send((0, error_utils_1.createErrorMessages)(errors));
        return;
    }
    const video = videos_1.db.videos.find(video => video.id === +req.params.id);
    if (!video) {
        res.status(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404).send((0, error_utils_1.createErrorMessages)(errors));
        return;
    }
    video.title = req.body.title,
        video.author = req.body.author,
        video.canBeDownloaded = req.body.canBeDownloaded,
        video.minAgeRestriction = req.body.minAgeRestriction,
        video.publicationDate = req.body.publicationDate,
        video.availableResolutions = req.body.availableResolutions;
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
});
exports.videoRouter.post("", (req, res) => {
    const errors = (0, videoInputValidation_1.videoInputValidation)(req.body);
    if (errors.length > 0) {
        res.status(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400).send((0, error_utils_1.createErrorMessages)(errors));
        return;
    }
    let nextDay = new Date();
    nextDay.setDate(nextDay.getDate() + 1);
    const newVideo = {
        id: videos_1.db.videos.length ? videos_1.db.videos[videos_1.db.videos.length - 1].id + 1 : 1,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: nextDay.toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    videos_1.db.videos.push(newVideo);
    res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newVideo);
});
exports.videoRouter.delete('/:id', (req, res) => {
    for (let i = 0; i < videos_1.db.videos.length; i++) {
        if (videos_1.db.videos[i].id === +req.params.id) {
            videos_1.db.videos.splice(i, 1);
            res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
});
