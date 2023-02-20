import { useRef } from "react";

import { Modal } from "components";

import { Position } from "models/position";
import { OkCancelButtons } from "components/modal/ok-cancel-buttons";
import { PositionForm } from "./position-form";

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

  const saveForm = () => {
    const parentIdFieldValue = parentIdField.current?.value;
    saveHandler({
      id: position.id,
      name: nameField.current?.value ?? "",
      parentId: parentIdFieldValue ? Number(parentIdFieldValue) : null,
    });
  };

  const dialogTitle = isNew
    ? "Добавление новой должности"
    : "Редактирование должности";

  return (
    <Modal
      isVisible={isVisible}
      title={dialogTitle}
      footer={
        <OkCancelButtons
          okLabel="Сохранить"
          okHandler={saveForm}
          cancelHandler={closeHandler}
        />
      }
      onClose={closeHandler}
    >
      <PositionForm
        position={position}
        controls={{ nameField, parentIdField }}
      />
    </Modal>
  );
};
