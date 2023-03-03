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
    console.info({ validationResult });
    setErrors(validationResult);
    console.info({ errors });
    // setHasErrors(errors.length > 0);
    console.info({ hasErrors });
  };

  const resetErrors = () => {
    setErrors([]);
    // setHasErrors(false);
  };

  return [hasErrors, errors, validate, resetErrors];
};
