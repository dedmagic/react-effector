import { useStore } from "effector-react";

import { useErrors } from "common/hooks";

import { Employee } from "modules/employees";
import { $nameField, $positionIdField } from "./employee-form-store";
import { validateEmployee } from "./employee-validation";
import { NO_ERRORS } from "common/types";
import { useMemo } from "react";
import { ErrorsList, Modal, OkCancelButtons } from "common/components";
import { EmployeeForm } from "./employee-form";

interface EmployeeEditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (employee: Employee) => void;
  employee: Employee;
}
export const EmployeeEditDialog = (props: EmployeeEditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, employee } = props;
  const [errors, setErrors, clearErrors] = useErrors();

  const name = useStore($nameField);
  const positionId = useStore($positionIdField);

  const saveForm = () => {
    const rawEmployee = {
      id: employee.id,
      name: name.trim(),
      positionId: positionId ?? 0,
    };

    const errors = validateEmployee(rawEmployee);
    if (errors === NO_ERRORS) {
      saveHandler(rawEmployee);
      return;
    }

    setErrors(errors);
  };

  const dialogTitle = useMemo(
    () =>
      !employee.id ? "Добавление сотрудника" : "Редактирование сотрудника",
    [employee.id]
  );

  return (
    <>
      <Modal
        isVisible={isVisible}
        title={dialogTitle}
        footer={
          <OkCancelButtons
            okLabel="Сохранить"
            okHandler={saveForm}
            cancelHandler={closeHandler}
          />
        }
        onEnter={saveForm}
        onClose={closeHandler}
      >
        <EmployeeForm employee={employee} />
      </Modal>
      <ErrorsList errors={errors} closeHandler={clearErrors} />
    </>
  );
};
