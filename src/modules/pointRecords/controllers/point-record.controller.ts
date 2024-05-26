import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { SearchValueInColumn } from 'src/utils/pagination';
import { CreatePointRecordUseCase } from '../useCases/create-point-record.useCase';
import { GetPointRecordUseCase } from '../useCases/get-point-record.useCase';
import { CreatePointRecordDto } from '../dtos/create-point-record.dto';
import { FinishPointRecordDto } from '../dtos/finish-point-record.dto';
import { FinishPointRecordUseCase } from '../useCases/finish-point-record.useCase';
import { OpenPointRecordDto } from '../dtos/open-point-record.dto';

@Controller('pointRecords')
export class PointRecordController {
  constructor(
    private readonly createPointRecordUseCase: CreatePointRecordUseCase,
    private readonly getPointRecordUseCase: GetPointRecordUseCase,
    private readonly finishPointRecordUseCase: FinishPointRecordUseCase,
  ) {}

  @Post()
  create(@Body() createPointRecordDto: CreatePointRecordDto) {
    return this.createPointRecordUseCase.execute(createPointRecordDto);
  }

  @Patch('/finish')
  update(
    @Query('userCode') userCode: string,
    @Body() finishPointRecordDto: FinishPointRecordDto,
  ) {
    return this.finishPointRecordUseCase.finish(userCode, finishPointRecordDto);
  }

  @Get('/search/:page')
  async findSearch(
    @Param('page') page: number,
    @Query() search: SearchValueInColumn,
  ) {
    return this.getPointRecordUseCase.getPointRecords(search, page);
  }

  @Get('/singleCode')
  async searchSingleUserCode(@Query() data: OpenPointRecordDto) {
    return this.getPointRecordUseCase.getSingleByOpenUserCode(data);
  }
}
