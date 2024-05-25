import { IsString, Matches } from 'class-validator';
import { PointRecordMessageHelper } from 'src/utils/message.helps';

export class CreatePointRecordDto {
  id?: string;

  @IsString()
  @Matches(/\S/, { message: PointRecordMessageHelper.EMPTY_USER_CODE })
  userCode: string;

  workedHours?: string;
  finishedAt?: Date;
}
