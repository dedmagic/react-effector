import { Modal } from "components";

import { Position } from "models/position";
import { OkCancelButtons } from "components/modal/ok-cancel-buttons";
import { PositionForm } from "./position-form";
import { useStore } from "effector-react";
import { $nameField, $parentIdField } from "../lib/position-form-store";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (position: Position) => void;
  position: Position;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, position } = props;
  const isNew = !position.id;

  const name = useStore($nameField);
  const parentId = useStore($parentIdField);

  const saveForm = () => {
    saveHandler({
      id: position.id,
      name: name,
      parentId: parentId,
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
      <PositionForm position={position} />
    </Modal>
  );
};
