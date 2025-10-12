"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupApp = void 0;
const express_1 = __importDefault(require("express"));
const videos_1 = require("./db/videos");
const http_statuses_1 = require("./http_statuses/http_statuses");
const setupApp = (app) => {
    app.use(express_1.default.json()); // middleware для парсинга JSON в теле запроса
    app.get("/hometask_01/api/videos", (req, res) => {
        res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(videos_1.db.videos);
    });
    app.get('/hometask_01/api/videos/:id', (req, res) => {
        const video = videos_1.db.videos.find((video) => video.id === +req.params.id);
        if (!video) {
            return res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
        }
        res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(video);
    });
    app.put('/hometask_01/api/videos/:id', (req, res) => {
        if (!req.body.title) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const video = videos_1.db.videos.find(video => video.id === +req.params.id);
        if (!video) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
            return;
        }
        video.title = req.body.title,
            video.author = req.body.author,
            video.canBeDownloaded = req.body.canBeDownloaded,
            video.minAgeRestriction = req.body.minAgeRestriction,
            video.publicationDate = req.body.publicationDate,
            video.availableResolutions = req.body.availableResolutions;
        res.status(http_statuses_1.HTTP_STATUSES.OK_200).send(video);
    });
    app.post("/hometask_01/api/videos", (req, res) => {
        if (!req.body.title) {
            res.sendStatus(http_statuses_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        const newVideo = {
            id: videos_1.db.videos.length ? videos_1.db.videos[videos_1.db.videos.length - 1].id + 1 : 1,
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: "2025-10-10T11:01:46.525Z",
            publicationDate: "2025-10-10T11:01:46.525Z",
            availableResolutions: req.body.availableResolutions
        };
        videos_1.db.videos.push(newVideo);
        res.status(http_statuses_1.HTTP_STATUSES.CREATED_201).send(newVideo);
    });
    app.delete('/hometask_01/api/videos/:id', (req, res) => {
        for (let i = 0; i < videos_1.db.videos.length; i++) {
            if (videos_1.db.videos[i].id === +req.params.id) {
                videos_1.db.videos.splice(i, 1);
                res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NOT_FOUND_404);
    });
    app.delete('/__tests__/data', (req, res) => {
        videos_1.db.videos = [];
        res.sendStatus(http_statuses_1.HTTP_STATUSES.NO_CONTENT_204);
    });
    return app;
};
exports.setupApp = setupApp;
