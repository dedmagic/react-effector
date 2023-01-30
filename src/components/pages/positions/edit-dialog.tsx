import { useEffect, useState } from "react";

import { Modal } from "components/common";

import { $positions, Position } from "models/position";
import { useStore } from "effector-react";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (jobTitle: Position) => void;
  jobTitle: Position;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, jobTitle } = props;
  const isNew = !jobTitle.id;

  const [entityName, setEntityName] = useState("");
  const [entityParentId, setEntityParentId] = useState<number | undefined>();
  useEffect(() => {
    setEntityName(jobTitle.name);
    setEntityParentId(jobTitle.parentId ?? 0);
  }, [jobTitle]);

  const positions = useStore($positions);

  const form = (
    <>
      {/* <div className="input-label"> */}
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
      id: jobTitle.id,
      name: entityName,
      parentId: entityParentId,
    });
  };

  return (
    <Modal
      isVisible={isVisible}
      title={isNew ? "Редактирование должности" : "Добавление новой должности"}
      content={form}
      footer={
        <>
          <button onClick={saveForm}>Сохранить</button>
          <button onClick={closeHandler}>Отменить</button>
        </>
      }
      onClose={closeHandler}
    />
  );
};
