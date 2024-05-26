import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PointRecordRepositoryContract } from '../repositories/point-record.repository.contract';
import { FinishPointRecordDto } from '../dtos/finish-point-record.dto';
import { PointRecordEntity } from '../entities/point-record.entity';
import { PointRecordMessageHelper } from 'src/utils/message.helps';
import { differenceInMinutes, format } from 'date-fns';
import { newDate } from 'src/utils/date';

@Injectable()
export class FinishPointRecordUseCase {
  constructor(
    @Inject('PointRecordRepositoryContract')
    private pointRecordRepository: PointRecordRepositoryContract,
  ) {}

  async finish(
    userCode: string,
    data: FinishPointRecordDto,
  ): Promise<PointRecordEntity> {
    const existUserCode =
      await this.pointRecordRepository.findByUserCode(userCode);

    const thereIsAnOpenPoint =
      await this.pointRecordRepository.findByOpenUserCode(userCode);

    if (!existUserCode) {
      throw new HttpException(
        PointRecordMessageHelper.THERE_NOT_IS_USER_CODE,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!thereIsAnOpenPoint) {
      throw new HttpException(
        PointRecordMessageHelper.THERE_NOT_IS_OPEN_POINT,
        HttpStatus.BAD_REQUEST,
      );
    }

    const totalMinutes = differenceInMinutes(
      newDate(),
      thereIsAnOpenPoint.createdAt,
    );

    // Converte a diferença em horas e minutos
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const workedHours = format(new Date(0, 0, 0, hours, minutes), 'HH:mm');

    return await this.pointRecordRepository.finishPointRecord(
      thereIsAnOpenPoint.id,
      {
        ...data,
        finishedAt: newDate(),
        workedHours: workedHours,
      },
    );
  }
}
