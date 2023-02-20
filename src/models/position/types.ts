export class Position {
  id: number = 0;
  name: string = "";
  parentId: number | null = null;
}

export interface PositionRow extends Position {
  parentName?: string;
}
