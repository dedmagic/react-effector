import { RefObject } from "react";
import { useStore } from "effector-react";

import { $positions, Position } from "models/position";

interface PositionFormProps {
  position: Position;
  controls: {
    nameField: RefObject<HTMLInputElement>;
    parentIdField: RefObject<HTMLSelectElement>;
  };
}

export const PositionForm = (props: PositionFormProps) => {
  const {
    position,
    controls: { nameField, parentIdField },
  } = props;

  const positions = useStore($positions);

  return (
    <>
      <div className="form-control">
        <label htmlFor="entity-name">Наименование должности</label>
        <input
          id="entity-name"
          placeholder="Введите наименование должности"
          defaultValue={position.name}
          ref={nameField}
        />
      </div>
      <div className="form-control">
        <label htmlFor="entity-parentId">Кому подчиняется</label>
        <select
          defaultValue={position.parentId ?? undefined}
          ref={parentIdField}
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
