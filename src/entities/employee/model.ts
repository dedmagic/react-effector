export class Employee {
  id: number = 0;
  name: string = '';
  positionId: number = 0;
}

export class EmployeeRow extends Employee {
  positionName: string = '';
}
