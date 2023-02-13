import { useCallback, useState } from "react";

export const useToggle = (
  initialValue: boolean = false
): [boolean, (value: boolean) => void] => {
  const [toggle, setToggle] = useState<boolean>(initialValue);
  const toggler = useCallback(setToggle, [setToggle]);
  return [toggle, toggler];
};
