// import {WithId} from "mongodb";
// import {Blog} from "../../core/types/blogs-types";
//
//
// export function mapToDriverListPaginatedOutput(
//   drivers: WithId<Blog>[],
//   meta: { pageNumber: number; pageSize: number; totalCount: number },
// ): BlogListPaginatedOutput {
//   return {
//     meta: {
//       page: meta.pageNumber,
//       pageSize: meta.pageSize,
//       pageCount: Math.ceil(meta.totalCount / meta.pageSize),
//       totalCount: meta.totalCount,
//     },
//     data: drivers.map(
//       (driver): DriverDataOutput => ({
//         type: ResourceType.Drivers,
//         id: driver._id.toString(),
//         attributes: {
//           name: driver.name,
//           phoneNumber: driver.phoneNumber,
//           email: driver.email,
//           vehicle: driver.vehicle,
//           createdAt: driver.createdAt,
//         },
//       }),
//     ),
//   };
// }