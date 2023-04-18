import { Modal } from "shared";

import "./errors-list.css";

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
        <li className="errors-list__item" key={index}>
          {error}
        </li>
      ))}
    </ul>
  </Modal>
);
