import { randomUUID as uuid } from 'crypto';

export class PointRecordEntity {
  id: string;
  userCode: string;
  createdAt: Date;
  workedHours: string;
  finishedAt: Date;

  constructor(props: Omit<PointRecordEntity, 'id'>, id?: string) {
    Object.assign(this, props);
    this.id = id ?? uuid();
  }
}
