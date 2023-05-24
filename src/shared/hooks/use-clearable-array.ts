import { SimpleAction } from "shared/types";
import { useState } from "react";

export const useClearableArray = <T>(
  initial: T[]
): [T[], (value: T[]) => void, SimpleAction] => {
  const [value, setValue] = useState<T[]>(initial);
  const clearValue = () => setValue([]);

  return [value, setValue, clearValue];
};
