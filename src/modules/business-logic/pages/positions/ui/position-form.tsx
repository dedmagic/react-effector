import { useRef } from "react";
import { useStore } from "effector-react";

import { $positions, Position } from "models/position";

interface PositionFormProps {
  position: Position;
  changeNameHandler: (newName: string) => void;
  changeParentIdHandler: (newParentId: number | undefined) => void;
}

export const PositionForm = (props: PositionFormProps) => {
  const { position, changeNameHandler, changeParentIdHandler } = props;
  const positions = useStore($positions);

  const nameField = useRef<HTMLInputElement>(null);
  const parentIdField = useRef<HTMLSelectElement>(null);

  return (
    <>
      <div className="form-control">
        <label htmlFor="entity-name">Наименование должности</label>
        <input
          id="entity-name"
          placeholder="Введите наименование должности"
          defaultValue={position.name}
          ref={nameField}
          onChange={() => changeNameHandler(nameField.current?.value ?? "")}
        />
      </div>
      <div className="form-control">
        <label htmlFor="entity-parentId">Кому подчиняется</label>
        <select
          defaultValue={position.parentId}
          ref={parentIdField}
          onChange={() =>
            changeParentIdHandler(
              parseInt(parentIdField.current?.value ?? "0") ?? undefined
            )
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
