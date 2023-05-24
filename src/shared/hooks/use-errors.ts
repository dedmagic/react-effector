import { useClearableArray } from "./use-clearable-array";

export const useErrors = () => {
  return useClearableArray<string>([]);
};
