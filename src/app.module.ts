import { Module } from '@nestjs/common';
import { PointRecordModule } from './modules/pointRecords/models/point-record.module';
import { PrismaModule } from './gateways/prisma/prisma.module';

@Module({
  imports: [PrismaModule, PointRecordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
