import { useStore } from "effector-react";

import { $positions, Position } from "entities/position";
import { useEffect } from "react";
import {
  $nameField,
  $parentIdField,
  changeNameField,
  changeParentIdField,
  setAllFields,
} from "./position-form-store";

interface PositionFormProps {
  position: Position;
}

export const PositionForm = (props: PositionFormProps) => {
  const { position } = props;
  useEffect(() => {
    setAllFields(position);
  }, [position]);

  const positions = useStore($positions);

  const name = useStore($nameField);
  const parentId = useStore($parentIdField);

  return (
    <>
      <div className="form-control">
        <label htmlFor="entity-name">Наименование должности</label>
        <input
          id="entity-name"
          placeholder="Введите наименование должности"
          value={name}
          onChange={(e) => changeNameField(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="entity-parentId">Кому подчиняется</label>
        <select
          value={parentId ?? undefined}
          onChange={(event) =>
            changeParentIdField(parseInt(event.target.value) ?? undefined)
          }
        >
          <option key={0} value={0}>
            (нет начальника)
          </option>
          {positions
            .filter((pos) => pos.id !== position.id)
            .map((pos) => (
              <option key={pos.id} value={pos.id}>
                {pos.name}
              </option>
            ))}
        </select>
      </div>
    </>
  );
};
