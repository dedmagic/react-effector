export enum ErrandStatus {
  Undefined,
  InWork,
  SoonToExpire,
  Overdue,
  Completed,
  ExecutedOutOfTime,
  Canceled,
}

export class Errand {
  id: number = 0;
  description: string = '';
  responsibleId: number = 0; // responsible is employee
  status: ErrandStatus = ErrandStatus.Undefined;
}

export interface ErrandRow {
  responsibleName: string;
  statusName: string;
}
