import { API_URL } from "common/config";
import { api } from "common/api";

import { Employee } from "modules/employees";

const EMPLOYEE_API_URL = `${API_URL}/employees`;

export const fetchAllEmployees = () =>
  api.getAllEntities<Employee>(EMPLOYEE_API_URL);

export const deleteEmployee = async (employeeId: number): Promise<boolean> => {
  return api.deleteEntity(EMPLOYEE_API_URL, employeeId);
};
