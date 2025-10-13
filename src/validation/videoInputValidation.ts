import {VideoInputDto} from "../video-input-types/video.input-dto";
import {ValidationError} from "../errors-messages/validationError";
import {availableResolution} from "../types/video-types";

export const videoInputValidation = (data: VideoInputDto): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim().length > 40
  ) {
    errors.push({message: 'invalid title', field: 'title'})
  }

  if(
    !data.author ||
    data.author.trim().length > 20
  ) {
    errors.push({message: 'invalid author', field: 'author'})
  }

  if (
    data.minAgeRestriction !== null &&
    (
      typeof data.minAgeRestriction !== 'number' ||
      data.minAgeRestriction > 18 ||
      data.minAgeRestriction < 1
    )
  ) {
    errors.push({message: 'invalid age restriction', field: 'minAgeRestriction'});
  }

  if (
    !data.createdAt ||
    typeof data.createdAt !== 'string'
  ) {
    errors.push({message: 'invalid data of create', field: 'createdAt'})
  }

  if(
    !data.publicationDate ||
    typeof data.publicationDate !== 'string'
  ) {
    errors.push({message: 'invalid data of create', field: 'publicationDate'})
  }

  if (!Array.isArray(data.availableResolutions)) {
    errors.push({message: 'invalid resolutions', field: 'availableResolutions'})
  } else if (data.availableResolutions.length) {
    const existingResolutions = Object.values(availableResolution);
    if (
      data.availableResolutions.length > existingResolutions.length ||
      data.availableResolutions.length < 1
    ) {
      errors.push({message: 'invalid available resolutions', field: 'availableResolutions'})
    }
    for (const resolution of data.availableResolutions) {
      if (!existingResolutions.includes(resolution)) {
        errors.push({message: 'invalid available resolution' + resolution, field: 'availableResolutions'})
      }
      break;
    }

  }

    return errors
}