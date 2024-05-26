import { Inject, Injectable } from '@nestjs/common';
import { PointRecordRepositoryContract } from '../repositories/point-record.repository.contract';
import {
  PaginatedData,
  SearchValueInColumn,
  getParametersToPaginate,
  paginateResponse,
} from 'src/utils/pagination';
import { PaginatedPointRecordDTO } from '../dtos/paginated-point-record.dto';
import { PointRecordEntity } from '../entities/point-record.entity';
import { OpenPointRecordDto } from '../dtos/open-point-record.dto';

@Injectable()
export class GetPointRecordUseCase {
  constructor(
    @Inject('PointRecordRepositoryContract')
    private repositoryPointRecord: PointRecordRepositoryContract,
  ) {}

  private async getValuesInPointRecords(
    value: string,
    { skip, take, page }: PaginatedData,
  ) {
    const { pointRecords, total } =
      await this.repositoryPointRecord.findFilteredPointRecordWithPagination(
        value,
        {
          skip,
          take,
          page,
        },
      );
    const goal = paginateResponse({ total, page, take });
    return { pointRecords, ...goal };
  }

  private async getAllPointRecordPaginated({
    skip,
    take,
    page,
  }: PaginatedData) {
    const { pointRecords, total } =
      await this.repositoryPointRecord.findAllPointRecordWithPagination({
        skip,
        take,
        page,
      });
    const goal = paginateResponse({ total, page, take });
    return { pointRecords, ...goal };
  }

  public async getPointRecords(
    { value }: SearchValueInColumn,
    pageNumber: number,
  ): Promise<PaginatedPointRecordDTO | PointRecordEntity[]> {
    const { skip, take, page } = getParametersToPaginate(pageNumber);
    if (!value) return this.getAllPointRecordPaginated({ page, skip, take });
    if (value) return this.getValuesInPointRecords(value, { page, skip, take });
  }

  public async getSingleByOpenUserCode(
    data: OpenPointRecordDto,
  ): Promise<PointRecordEntity> {
    const findByOpenUserCode =
      await this.repositoryPointRecord.findUserCodeInProgress(data.userCode);
    return findByOpenUserCode;
  }
}
