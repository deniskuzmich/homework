type TestOutputTypeWithPagination <T = null> = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: T[];
};

export const testBlogData = {
  id: "3",
  name: "someName",
  description: "loloooloo",
  websiteUrl: "string",
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