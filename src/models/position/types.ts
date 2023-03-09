import { Nullable } from "types/types";

export class Position {
  id: number = 0;
  name: string = "";
  parentId: Nullable<number> = null;
}

export interface PositionRow extends Position {
  parentName?: string;
}
