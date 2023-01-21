import { Modal } from "components/common";

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
        <>
          <button onClick={() => approveHandler()}>Удалить</button>
          <button onClick={closeHandler}>Отмена</button>
        </>
      }
      onClose={closeHandler}
    />
  );
};
