import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PointRecordRepositoryContract } from '../repositories/point-record.repository.contract';
import { CreatePointRecordDto } from '../dtos/create-point-record.dto';
import { PointRecordEntity } from '../entities/point-record.entity';
import { PointRecordMessageHelper } from 'src/utils/message.helps';

@Injectable()
export class CreatePointRecordUseCase {
  constructor(
    @Inject('PointRecordRepositoryContract')
    private pointRecordRepository: PointRecordRepositoryContract,
  ) {}

  async execute(data: CreatePointRecordDto): Promise<PointRecordEntity> {
    const thereIsAnOpenPoint =
      await this.pointRecordRepository.findByOpenUserCode(data.userCode);

    if (thereIsAnOpenPoint) {
      throw new HttpException(
        PointRecordMessageHelper.THERE_IS_AN_OPEN_POINT,
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.pointRecordRepository.createPointRecord(data);
  }
}
