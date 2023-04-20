import { API_URL, api } from "api";

import { Employee } from "modules/employees";

const EMPLOYEE_API_URL = `${API_URL}/employees`;

export const fetchAllEmployees = () =>
  api.getAllEntities<Employee>(EMPLOYEE_API_URL);
