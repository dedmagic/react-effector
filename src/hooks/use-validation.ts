import { useEffect, useState } from "react";
import { ValidateFunction, ValidationResult } from "types";

type hookMembers<T> = [
  hasErrors: boolean,
  errors: ValidationResult,
  validate: (checkedData: T) => void,
  resetErrors: () => void
];

export const useValidation = <T>(
  validateFunction: ValidateFunction<T>
): hookMembers<T> => {
  const [errors, setErrors] = useState<ValidationResult>([]);
  const [hasErrors, setHasErrors] = useState<boolean>(false);

  useEffect(() => {
    setHasErrors(errors.length > 0);
  }, [errors]);

  const validate = (checkedData: T) => {
    const validationResult = validateFunction(checkedData);
    console.info("use-validation → ", { validationResult });
    setErrors(validationResult);
    console.info("use-validation → ", { errors });
    // Здесь это не сработает из-за асинхронности `useState`
    // setHasErrors(errors.length > 0);
    // или использовать `useEffect` (см. выше), или это:
    // setHasErrors(validationResult.length > 0);
    console.info("use-validation → ", { hasErrors });
  };

  const resetErrors = () => {
    setErrors([]);
    setHasErrors(false);
  };

  return [hasErrors, errors, validate, resetErrors];
};
