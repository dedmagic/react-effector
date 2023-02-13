import { useState } from "react";

export const useToggle = (initialValue: boolean = false) => {
  // const [toggle, setToggle] = useState<boolean>(initialValue);
  // return [toggle, setToggle];
  return useState<boolean>(initialValue);
};
