import { Modal } from "components/common";
import { OkCancelButtons } from "components/common/modal/ok-cancel-buttons";

interface DeleteDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  approveHandler: () => void;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { isVisible, closeHandler, approveHandler } = props;

  return (
    <Modal
      isVisible={isVisible}
      title="Удаление должности"
      content="Вы действительно хотите удалить эту должность?"
      footer={
        <OkCancelButtons
          okLabel="Удалить"
          okHandler={approveHandler}
          cancelHandler={closeHandler}
        />
      }
      onClose={closeHandler}
    />
  );
};
