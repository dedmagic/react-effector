import { useMemo } from "react";
import { useStore } from "effector-react";

import { ErrorsList, Modal, OkCancelButtons } from "common/components";
import { NO_ERRORS } from "common/types";
import { useErrors } from "common/hooks";

import { Position } from "modules/position";
import { PositionForm } from "./position-form";
import { $nameField, $parentIdField } from "./position-form-store";
import { validatePosition } from "./position-validation";

interface PositionEditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (position: Position) => void;
  position: Position;
}

export const PositionEditDialog = (props: PositionEditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, position } = props;
  const [errors, setErrors, clearErrors] = useErrors();

  const name = useStore($nameField);
  const parentId = useStore($parentIdField);

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
