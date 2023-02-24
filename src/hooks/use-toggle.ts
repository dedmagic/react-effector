import { useCallback, useState } from "react";

export const useToggle = (
  initialValue: boolean = false
): [boolean, (value?: boolean) => void] => {
  const [toggle, setToggle] = useState<boolean>(initialValue);
  const toggler = useCallback((value?: any) => {
    setToggle((oldValue) => (typeof value === "boolean" ? value : !oldValue));
  }, []);
  return [toggle, toggler];
};
