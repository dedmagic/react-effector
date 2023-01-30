import { Position } from "./position";

export const positionsMock: Position[] = [
  {
    id: 1,
    name: "Начальник",
  },
  {
    id: 2,
    name: "Заместитель начальника",
    parentId: 1,
  },
  {
    id: 3,
    name: "Начальник отдела",
    parentId: 2,
  },
  {
    id: 42,
    name: "Клерк",
    parentId: 3,
  },
];
