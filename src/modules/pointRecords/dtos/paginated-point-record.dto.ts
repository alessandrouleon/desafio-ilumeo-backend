import { PointRecordEntity } from '../entities/point-record.entity';

export class PaginatedPointRecordDTO {
  pointRecords: PointRecordEntity[];
  total: number;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  lastPage: number;
}
