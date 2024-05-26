import { CreatePointRecordDto } from './create-point-record.dto';
import { PartialType } from '@nestjs/swagger';

export class OpenPointRecordDto extends PartialType(CreatePointRecordDto) {}
