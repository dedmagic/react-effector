import { Modal } from "shared";
import { OkCancelButtons } from "shared/modal/ok-cancel-buttons";

interface PositionDeleteDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  approveHandler: () => void;
}

export const PositionDeleteDialog = (props: PositionDeleteDialogProps) => {
  const { isVisible, closeHandler, approveHandler } = props;

  return (
    <Modal
      isVisible={isVisible}
      title="Удаление должности"
      footer={
        <OkCancelButtons
          okLabel="Удалить"
          okHandler={approveHandler}
          cancelHandler={closeHandler}
        />
      }
      onClose={closeHandler}
    >
      Вы действительно хотите удалить эту должность?
    </Modal>
  );
};