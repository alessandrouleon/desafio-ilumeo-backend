import { Module } from '@nestjs/common';
import { PointRecordRepository } from '../repositories/point-record.repository';
import { GetPointRecordUseCase } from '../useCases/get-point-record.useCase';
import { CreatePointRecordUseCase } from '../useCases/create-point-record.useCase';
import { PointRecordController } from '../controllers/point-record.controller';
import { FinishPointRecordUseCase } from '../useCases/finish-point-record.useCase';

@Module({
  controllers: [PointRecordController],
  exports: [],
  providers: [
    CreatePointRecordUseCase,
    FinishPointRecordUseCase,
    GetPointRecordUseCase,
    {
      provide: 'PointRecordRepositoryContract',
      useClass: PointRecordRepository,
    },
  ],
})
export class PointRecordModule {}
