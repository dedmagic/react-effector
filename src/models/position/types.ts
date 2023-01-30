export class Position {
  id: number = 0;
  name: string = "";
  parentId?: number;
}

export interface PositionView extends Position {
  parentName?: string;
}
