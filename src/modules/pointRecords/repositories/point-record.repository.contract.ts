import { PointRecordEntity } from '../entities/point-record.entity';
import { CreatePointRecordDto } from '../dtos/create-point-record.dto';
import { PaginatedData } from 'src/utils/pagination';
import { FinishPointRecordDto } from '../dtos/finish-point-record.dto';

export interface IPointRecordReturnWithPagination {
  pointRecords: PointRecordEntity[];
  total: number;
}

export interface PointRecordRepositoryContract {
  createPointRecord(data: CreatePointRecordDto): Promise<PointRecordEntity>;
  finishPointRecord(
    id: string,
    data: FinishPointRecordDto,
  ): Promise<PointRecordEntity>;
  findByUserCode(userCode: string): Promise<PointRecordEntity>;
  findByOpenUserCode(userCode: string): Promise<PointRecordEntity>;
  findFilteredPointRecordWithPagination(
    value: string,
    parametersToPaginate: PaginatedData,
  ): Promise<IPointRecordReturnWithPagination>;
  findAllPointRecordWithPagination(
    parametersToPaginate: PaginatedData,
  ): Promise<IPointRecordReturnWithPagination>;
}
