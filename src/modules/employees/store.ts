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

//#region delete employee
export const removeEmployee = createEvent<number>("remove employee");
const deleteEmployeeFx = createEffect(async (employeeId: number) => {
  const result = await api.deleteEmployee(employeeId);
  console.info(`api call result: ${result}`);
});
sample({ clock: removeEmployee, target: deleteEmployeeFx });
sample({ clock: deleteEmployeeFx.done, target: fetchAllEmployees });
sample({
  clock: deleteEmployeeFx.failData,
  fn: () =>
    console.error(
      "Ошибка взаимодействия с сервером: не удалось удалить запись"
    ),
});
//#endregion delete employee

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
