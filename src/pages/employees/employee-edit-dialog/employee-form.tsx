import { useEffect } from "react";
import { useStore } from "effector-react";

import { Employee } from "entities/employees";
import {
  $nameField,
  $positionIdField,
  changeNameField,
  changePositionIdField,
  setAllFields,
} from "./employee-form-store";
import { $positions } from "entities/position";

interface EmployeeFormProps {
  employee: Employee;
}

export const EmployeeForm = (props: EmployeeFormProps) => {
  const { employee } = props;
  useEffect(() => {
    setAllFields(employee);
  }, [employee]);

  const positions = useStore($positions);

  const name = useStore($nameField);
  const positionId = useStore($positionIdField);

  return (
    <>
      <div className="form-control">
        <label htmlFor="entity-name">ФИО сотрудника</label>
        <input
          id="entity-name"
          placeholder="Введите ФИО сотрудника"
          value={name}
          onChange={(event) => changeNameField(event.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="position-id">Должность</label>
        <select
          value={positionId ?? undefined}
          onChange={(event) =>
            changePositionIdField(parseInt(event.target.value))
          }
        >
          {positions.map((pos) => (
            <option key={pos.id} value={pos.id}>
              {pos.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
