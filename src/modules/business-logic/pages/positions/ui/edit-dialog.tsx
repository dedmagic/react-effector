import { useStore } from "effector-react";
import { useMemo } from "react";

import { ErrorsList, Modal, OkCancelButtons } from "components";

import { Position } from "models/position";
import { PositionForm } from "./position-form";
import { $nameField, $parentIdField } from "../lib/position-form-store";
import { validatePosition } from "../lib/position-validation";
import { useValidation } from "hooks/use-validation";

interface EditDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  saveHandler: (position: Position) => void;
  position: Position;
}

export const EditDialog = (props: EditDialogProps) => {
  const { isVisible, saveHandler, closeHandler, position } = props;
  const [hasErrors, errors, validate, resetErrors] =
    useValidation(validatePosition);

  const name = useStore($nameField);
  const parentId = useStore($parentIdField);

  const saveForm = () => {
    const rawPosition = {
      id: position.id,
      name: name.trim(),
      parentId: parentId,
    };

    validate(rawPosition);
    console.info("edit-dialog → ", { hasErrors });
    console.info("edit-dialog → ", { errors });
    if (!hasErrors) {
      saveHandler(rawPosition);
    }
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
      <ErrorsList errors={errors} closeHandler={resetErrors} />
    </>
  );
};
