export class Position {
  id: number = 0;
  name: string = "";
  parentId?: number;
}

export interface PositionRow extends Position {
  parentName?: string;
}
