interface OkCancelButtonsProps {
  okLabel: string;
  okHandler: () => void;
  cancelLabel?: string;
  cancelHandler: () => void;
}
export const OkCancelButtons = ({
  okLabel,
  okHandler,
  cancelLabel = "Отмена",
  cancelHandler,
}: OkCancelButtonsProps) => (
  <>
    <button onClick={okHandler}>{okLabel}</button>
    <button onClick={cancelHandler}>{cancelLabel}</button>
  </>
);
