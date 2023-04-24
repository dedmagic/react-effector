import { useCallback, useState } from "react";

type ToggleFunction = (value?: boolean) => void;

export const useToggle = (
  initialValue: boolean = false
): [boolean, ToggleFunction] => {
  const [toggle, setToggle] = useState<boolean>(initialValue);
  const toggler = useCallback((value?: any) => {
    setToggle((oldValue) => (typeof value === "boolean" ? value : !oldValue));
  }, []);
  return [toggle, toggler];
};
