import { API_URL } from 'shared/config';
import { api } from 'shared/api';

import { Employee } from '.';

const EMPLOYEE_API_URL = `${API_URL}/employees`;

export const fetchAllEmployees = (): Promise<Employee[]> =>
  api.getAllEntities<Employee>(EMPLOYEE_API_URL);

export const deleteEmployee = async (employeeId: number): Promise<boolean> =>
  api.deleteEntity(EMPLOYEE_API_URL, employeeId);

export const updateEmployee = async (employee: Employee): Promise<boolean> =>
  api.updateEntity(EMPLOYEE_API_URL, employee);

export const createEmployee = async (employee: Employee): Promise<boolean> =>
  api.createEntity(EMPLOYEE_API_URL, employee);
