import { useEffect, useState } from "react";

import { Modal } from "components/common";

import { JobTitle } from "models/job-title";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (jobTitle: JobTitle) => void;
  jobTitle: JobTitle;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, jobTitle } = props;
  const isNew = !jobTitle.id;

  const [entityName, setEntityName] = useState("");
  useEffect(() => {
    setEntityName(jobTitle.name);
  }, [jobTitle]);

  const form = (
    <>
      <div className="input-label">
        <label htmlFor="entity-name">Наименование должности</label>
      </div>
      <input
        id="entity-name"
        placeholder="Введите наименование должности"
        value={entityName}
        onChange={(e) => setEntityName(e.target.value)}
      />
    </>
  );

  const saveForm = () => {
    saveHandler({
      id: jobTitle.id,
      name: entityName,
      parentId: jobTitle.parentId,
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
