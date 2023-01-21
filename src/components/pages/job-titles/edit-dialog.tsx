import { useStore } from "effector-react";

import { NullableNumber } from "types";

import { Modal } from "components/common";
import { $jobTitles, JobTitle } from "models/job-title";
import { useState } from "react";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  approveHandler: () => void;
  entityId?: NullableNumber;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, approveHandler, closeHandler, entityId } = props;

  const store = useStore($jobTitles);
  const entity = entityId
    ? store.find((jt) => jt.id === entityId)
    : new JobTitle();
  if (!entity) {
    throw new Error(`Должность с ID = ${entityId} не найдена`);
  }

  const localState = useState<JobTitle>(entity);

  const form = (
    <>
      <div className="input-label">
        <label htmlFor="entity-name">Наименование должности</label>
      </div>
      <input id="entity-name" placeholder="Введите наименование должности" />
    </>
  );

  return (
    <Modal
      isVisible={isVisible}
      title={
        entityId ? "Редактирование должности" : "Добавление новой должности"
      }
      content={form}
      footer={
        <>
          <button onClick={approveHandler}>Сохранить</button>
          <button onClick={closeHandler}>Отменить</button>
        </>
      }
      onClose={closeHandler}
    />
  );
};
