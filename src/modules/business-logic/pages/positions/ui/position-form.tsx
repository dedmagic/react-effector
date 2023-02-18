import { useStore } from "effector-react";

import { $positions, Position } from "models/position";
import { useEffect } from "react";
import {
  $nameField,
  $parentIdField,
  changeNameField,
  changeParentIdField,
} from "../lib/position-form-store";

interface PositionFormProps {
  position: Position;
}

export const PositionForm = (props: PositionFormProps) => {
  const { position } = props;
  useEffect(() => {
    changeNameField(position.name);
    // TODO: `undefined` в стор не кладётся -- почему?
    changeParentIdField(position.parentId ?? 0);
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
          value={parentId}
          onChange={(e) =>
            changeParentIdField(parseInt(e.target.value) ?? undefined)
          }
        >
          <option key={0} value={0}>
            (нет начальника)
          </option>
          {positions.map((position) => (
            <option key={position.id} value={position.id}>
              {position.name}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};
