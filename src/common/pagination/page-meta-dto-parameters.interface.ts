import { PaginationDto } from '@common/pagination/pagination.dto';

export interface PageMetaDtoParameters {
  paginationDto: PaginationDto;
  totalCount: number;
}
