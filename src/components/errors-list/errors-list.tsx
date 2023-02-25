import { Modal } from "components";

import { ErrorsListItem } from "./errors-list-item";

interface ErrorsListProps {
  errors: string[];
  closeHandler: () => void;
}

export const ErrorsList = ({ errors, closeHandler }: ErrorsListProps) => (
  <Modal
    isVisible={errors?.length !== 0}
    title="Некорректное заполнение"
    footer={<button onClick={closeHandler}>Закрыть</button>}
    onClose={closeHandler}
  >
    <ul>
      {errors.map((error, index) => (
        // `key={index}` можно, ибо список read-only
        <ErrorsListItem error={error} key={index} />
      ))}
    </ul>
  </Modal>
);
