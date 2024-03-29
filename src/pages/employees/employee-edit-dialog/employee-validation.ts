import { NO_ERRORS, ValidationResult } from 'shared/types';

import { Employee } from 'entities/employee';

export const validateEmployee = (rawEmployee: Employee): ValidationResult => {
  const errors: string[] = [];

  if (rawEmployee.name.trim().length === 0) {
    errors.push('У чувака должно быть имя');
  }

  if (errors.length === 0) {
    return NO_ERRORS;
  }

  return errors;
};
