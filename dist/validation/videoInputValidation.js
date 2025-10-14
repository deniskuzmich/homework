"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoInputValidation = void 0;
const video_types_1 = require("../types/video-types");
const videoInputValidation = (data) => {
    const errors = [];
    if (!data.title ||
        typeof data.title !== 'string' ||
        data.title.trim().length > 40) {
        errors.push({ message: 'invalid title', field: 'title' });
    }
    if (!data.author ||
        data.author.trim().length > 20) {
        errors.push({ message: 'invalid author', field: 'author' });
    }
    if (data.minAgeRestriction != null &&
        (typeof data.minAgeRestriction !== 'number' ||
            data.minAgeRestriction > 18 ||
            data.minAgeRestriction < 1)) {
        errors.push({ message: 'invalid age restriction', field: 'minAgeRestriction' });
    }
    if (data.canBeDownloaded != null &&
        typeof data.canBeDownloaded !== "boolean") {
        errors.push({ message: "invalid canBeDownloaded", field: "canBeDownloaded" });
    }
    if (data.publicationDate !== undefined) {
        if (typeof data.publicationDate !== "string" ||
            isNaN(Date.parse(data.publicationDate))) {
            errors.push({ message: "invalid publicationDate", field: "publicationDate" });
        }
    }
    if (!Array.isArray(data.availableResolutions)) {
        errors.push({ message: 'invalid resolutions', field: 'availableResolutions' });
    }
    else if (data.availableResolutions.length) {
        const existingResolutions = Object.values(video_types_1.availableResolution);
        if (data.availableResolutions.length > existingResolutions.length ||
            data.availableResolutions.length < 1) {
            errors.push({ message: 'invalid available resolutions', field: 'availableResolutions' });
        }
        for (const resolution of data.availableResolutions) {
            if (!existingResolutions.includes(resolution)) {
                errors.push({ message: 'invalid available resolution' + resolution, field: 'availableResolutions' });
            }
            // break;
        }
    }
    return errors;
};
exports.videoInputValidation = videoInputValidation;
