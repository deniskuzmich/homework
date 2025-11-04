import {PaginationAndSorting} from "../../core/types/pagination-and-sorting";
import {BlogsSortField} from "./blogs-sort-field";

export type DriverQueryInput = PaginationAndSorting<BlogsSortField> &
  Partial<{
    searchDriverNameTerm: string;
    searchDriverEmailTerm: string;
    searchVehicleMakeTerm: string;
  }>;