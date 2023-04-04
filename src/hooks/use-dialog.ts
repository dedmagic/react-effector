import { SimpleAction } from "types";
import { useToggle } from "./use-toggle";

export const useDialog = (
  isVisibleInitial: boolean = false
): [boolean, SimpleAction, SimpleAction] => {
  const [isVisibleDialog, toggleIsVisibleDialog] = useToggle(isVisibleInitial);

  const showDialog = () => toggleIsVisibleDialog(true);
  const hideDialog = () => toggleIsVisibleDialog(false);

  return [isVisibleDialog, showDialog, hideDialog];
};
