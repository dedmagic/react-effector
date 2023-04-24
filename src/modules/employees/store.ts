import { createEffect, createEvent, createStore, sample } from "effector";

import { ERROR_MSG } from "common/api";

import { Employee } from "modules/employees";
import { fetchAllEmployees } from "./api";

export const $employees = createStore<Employee[]>([]);

//#region fetch all
export const fetchAll = createEvent();
const fetchAllFx = createEffect(() => {
  return fetchAllEmployees();
});

sample({ clock: fetchAll, target: fetchAllFx });
sample({ clock: fetchAllFx.doneData, target: $employees });
sample({
  clock: fetchAllFx.failData,
  fn: () => console.error(ERROR_MSG.GET_REQUEST),
});
//#endregion fetch all

//#region for view
export const $employeesWithPositionName = $employees.map((employees) => {
  return employees.map((employee) => ({
    ...employee,
    positionName: "hello world",
  }));
});
//#endregion for view
