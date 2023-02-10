import { useEffect, useState } from "react";

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

  const [entityName, setEntityName] = useState("");
  const [entityParentId, setEntityParentId] = useState<number | undefined>();
  useEffect(() => {
    setEntityName(position.name);
    setEntityParentId(position.parentId ?? 0);
  }, [position]);

  const positions = useStore($positions);

  const form = (
    <>
      <div className="form-control">
        <label htmlFor="entity-name">Наименование должности</label>
        <input
          id="entity-name"
          placeholder="Введите наименование должности"
          value={entityName}
          onChange={(e) => setEntityName(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="entity-parentId">Кому подчиняется</label>
        <select
          value={entityParentId}
          onChange={(e) => setEntityParentId(parseInt(e.target.value))}
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

  const saveForm = () => {
    saveHandler({
      id: position.id,
      name: entityName,
      parentId: entityParentId,
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
