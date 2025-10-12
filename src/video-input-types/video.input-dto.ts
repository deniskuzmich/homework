import {availableResolution} from "../types/video-types";

export type VideoInputDto = {
  id: number,
  title: string,
  author: string,
  canBeDownloaded: boolean,
  minAgeRestriction: null | number,
  createdAt: string,
  publicationDate: string,
  availableResolutions: availableResolution[];
}