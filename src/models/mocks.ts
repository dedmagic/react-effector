import { JobTitle } from "./job-title";

export const jobTitlesMock: JobTitle[] = [
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
