import {ObjectId} from "mongodb";

type TestOutputTypeWithPagination <T = null> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};

export const testPostData = {
  id: "2",
  title: "string",
  shortDescription: "string",
  content: "string",
  blogId: new ObjectId(),
};

export const paginationWithoutData: TestOutputTypeWithPagination = {
  pagesCount: 0,
  page: 1,
  pageSize: 10,
  totalCount: 0,
  items: []
}

export function dataWithPagination(data: TestOutputTypeWithPagination[], page = 1, pageSize = 10) {
  const totalCount = data.length

  return {
    pagesCount: Math.ceil(totalCount / pageSize),
    page,
    pageSize,
    totalCount,
    items: data
  }
}