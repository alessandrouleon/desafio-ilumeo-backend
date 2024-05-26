import { Injectable } from '@nestjs/common';
import {
  IPointRecordReturnWithPagination,
  PointRecordRepositoryContract,
} from './point-record.repository.contract';
import { PaginatedData } from 'src/utils/pagination';
import { CreatePointRecordDto } from '../dtos/create-point-record.dto';
import { PointRecordEntity } from '../entities/point-record.entity';
import { PrismaService } from 'src/gateways/prisma/prisma.service';
import { FinishPointRecordDto } from '../dtos/finish-point-record.dto';

@Injectable()
export class PointRecordRepository implements PointRecordRepositoryContract {
  constructor(private readonly repository: PrismaService) {}

  public async createPointRecord(
    data: CreatePointRecordDto,
  ): Promise<PointRecordEntity> {
    return await this.repository.pointRecord.create({ data });
  }

  public async finishPointRecord(
    id: string,
    data: FinishPointRecordDto,
  ): Promise<PointRecordEntity> {
    return await this.repository.pointRecord.update({
      where: { id, finishedAt: null },
      data,
    });
  }

  public async findByUserCode(userCode: string): Promise<PointRecordEntity> {
    const findUserCode = await this.repository.pointRecord.findFirst({
      where: {
        userCode: {
          equals: userCode,
        },
      },
    });
    return findUserCode;
  }

  public async findByOpenUserCode(
    userCode: string,
  ): Promise<PointRecordEntity> {
    const findUserCode = await this.repository.pointRecord.findFirst({
      where: { userCode, finishedAt: null },
    });
    return findUserCode;
  }

  public async findFilteredPointRecordWithPagination(
    value: string,
    { take, page }: PaginatedData,
  ): Promise<IPointRecordReturnWithPagination> {
    const [data] = await Promise.all([
      this.repository.pointRecord.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
        where: {
          userCode: { equals: value },
          finishedAt: {
            not: null,
          },
        },
      }),
    ]);
    const total = data.length;
    return { pointRecords: data, total };
  }

  public async findAllPointRecordWithPagination({
    page,
    take,
  }: PaginatedData): Promise<IPointRecordReturnWithPagination> {
    const [data, total] = await Promise.all([
      this.repository.pointRecord.findMany({
        take,
        skip: (page - 1) * take,
        orderBy: {
          createdAt: 'desc',
        },
      }),
      this.repository.pointRecord.count(),
    ]);
    return { pointRecords: data, total };
  }
}
