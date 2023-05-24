import {
  combine,
  createEffect,
  createEvent,
  createStore,
  sample,
} from "effector";

import { ERROR_MSG } from "shared/api";

import * as api from "./api";
import { Employee } from "modules/employees";
import { $positions, fetchAllPositionsFx } from "modules/position";

export const $employees = createStore<Employee[]>([]);

//#region fetch all
export const fetchAllEmployees = createEvent();
const fetchAllEmployeesFx = createEffect(() => {
  return api.fetchAllEmployees();
});

sample({ clock: fetchAllEmployees, target: fetchAllEmployeesFx });
sample({ clock: fetchAllEmployeesFx.doneData, target: $employees });
sample({
  clock: fetchAllEmployeesFx.failData,
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
  fn: () => console.error(ERROR_MSG.DELETE_REQUEST),
});
//#endregion delete employee

//#region update employee
export const updateEmployee = createEvent<Employee>("update employee");
const updateEmployeeFx = createEffect(async (employee: Employee) => {
  const result = await api.updateEmployee(employee);
  console.info(`api call result: ${result}`);
});
sample({ clock: updateEmployee, target: updateEmployeeFx });
sample({ clock: updateEmployeeFx.done, target: fetchAllEmployeesFx });
sample({
  clock: updateEmployeeFx.failData,
  fn: () => console.error(ERROR_MSG.UPDATE_REQUEST),
});
//#endregion update employee

//#region create employee
export const createEmployee = createEvent<Employee>("create new employee");
const createEmployeeFx = createEffect(async (employee: Employee) => {
  const result = await api.createEmployee(employee);
  console.info(`api call result: ${result}`);
});
sample({ clock: createEmployee, target: createEmployeeFx });
sample({ clock: createEmployeeFx.done, target: fetchAllEmployeesFx });
sample({
  clock: createEmployeeFx.failData,
  fn: () => console.error(ERROR_MSG.CREATE_REQUEST),
});
//#endregion create employee

//#region for view
export const $employeesWithPositionName = combine(
  $employees,
  $positions,
  (employees, positions) => {
    return employees.map((employee) => ({
      ...employee,
      positionName:
        positions.find((position) => position.id === employee.positionId)
          ?.name ?? "",
    }));
  }
);
//#endregion for view
