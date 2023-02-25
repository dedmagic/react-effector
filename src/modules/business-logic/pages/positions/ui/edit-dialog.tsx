import { useStore } from "effector-react";
import { useMemo, useState } from "react";

import { ErrorsList, Modal, OkCancelButtons } from "components";
import { NO_ERRORS } from "types";

import { Position } from "models/position";
import { PositionForm } from "./position-form";
import { $nameField, $parentIdField } from "../lib/position-form-store";
import { validatePosition } from "../lib/position-validation";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (position: Position) => void;
  position: Position;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, position } = props;
  const [errors, setErrors] = useState<string[]>([]);

  const name = useStore($nameField);
  const parentId = useStore($parentIdField);

  const clearErrors = () => setErrors([]);

  const saveForm = () => {
    const rawPosition = {
      id: position.id,
      name: name.trim(),
      parentId: parentId,
    };

    const errors = validatePosition(rawPosition);
    if (errors === NO_ERRORS) {
      saveHandler(rawPosition);
      return;
    }

    setErrors(errors);
  };

  const dialogTitle = useMemo(
    () =>
      !position.id ? "Добавление новой должности" : "Редактирование должности",
    [position.id]
  );

  return (
    <>
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
        onEnter={saveForm}
        onClose={closeHandler}
      >
        <PositionForm position={position} />
      </Modal>
      <ErrorsList errors={errors} closeHandler={clearErrors} />
    </>
  );
};
