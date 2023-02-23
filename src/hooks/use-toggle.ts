import { useCallback, useState } from "react";

export const useToggle = (
  initialValue: boolean = false
): [boolean, (value?: boolean) => void] => {
  const [toggle, setToggle] = useState<boolean>(initialValue);
  const toggler = useCallback((value?: any) => {
    if (typeof value === "boolean") {
      setToggle(value);
      return;
    }

    setToggle((oldValue) => !oldValue);
  }, []);
  return [toggle, toggler];
};
