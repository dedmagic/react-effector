export enum ErrandStatus {
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
  status: ErrandStatus = ErrandStatus.InWork;
}
