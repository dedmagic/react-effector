import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { ERROR_MSG } from "common/api";
import * as api from "./api";

import { Employee } from "modules/employees";
import { $positions, fetchAllPositionsFx } from "modules/position";

export const $employees = createStore<Employee[]>([]);

//#region fetch all
export const fetchAllEmployees = createEvent();
const fetchAllFx = createEffect(() => {
  return api.fetchAllEmployees();
});

sample({ clock: fetchAllEmployees, target: fetchAllFx });
sample({ clock: fetchAllFx.doneData, target: $employees });
sample({
  clock: fetchAllFx.failData,
  fn: () => console.error(ERROR_MSG.GET_REQUEST),
});
sample({ clock: fetchAllEmployees, target: fetchAllPositionsFx });
//#endregion fetch all

//#region for view
export const $employeesWithPositionName = combine(
  $employees,
  $positions,
  (employees, positions) => {
    console.info(positions);
    return employees.map((employee) => ({
      ...employee,
      positionName:
        positions.find((position) => position.id === employee.positionId)
          ?.name ?? "",
    }));
  }
);
//#endregion for view
