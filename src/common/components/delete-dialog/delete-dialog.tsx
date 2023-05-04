import { Modal, OkCancelButtons } from "common/components";

interface DeleteDialogProps {
  isVisible: boolean;
  closeHandler: () => void;
  approveHandler: () => void;
  title: string;
  message: string;
}

export const DeleteDialog = (props: DeleteDialogProps) => {
  const { isVisible, closeHandler, approveHandler, title, message } = props;

  return (
    <Modal
      isVisible={isVisible}
      title={title}
      footer={
        <OkCancelButtons
          okLabel="Удалить"
          okHandler={approveHandler}
          cancelHandler={closeHandler}
        />
      }
      onClose={closeHandler}
    >
      {message}
    </Modal>
  );
};
