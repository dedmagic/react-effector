import { useRef } from "react";

import { Modal } from "components";

import { $positions, Position } from "models/position";
import { useStore } from "effector-react";
import { OkCancelButtons } from "components/modal/ok-cancel-buttons";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (position: Position) => void;
  position: Position;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, position } = props;
  const isNew = !position.id;

  const nameField = useRef<HTMLInputElement>(null);
  const parentIdField = useRef<HTMLSelectElement>(null);

  const positions = useStore($positions);

  const form = (
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
        <select defaultValue={position.parentId} ref={parentIdField}>
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

  const saveForm = () => {
    saveHandler({
      id: position.id,
      name: nameField.current?.value ?? "",
      parentId: parseInt(parentIdField.current?.value ?? "0") ?? undefined,
    });
  };

  const dialogTitle = isNew
    ? "Добавление новой должности"
    : "Редактирование должности";

  return (
    <Modal
      isVisible={isVisible}
      title={dialogTitle}
      content={form}
      footer={
        <OkCancelButtons
          okLabel="Сохранить"
          okHandler={saveForm}
          cancelHandler={closeHandler}
        />
      }
      onClose={closeHandler}
    />
  );
};
