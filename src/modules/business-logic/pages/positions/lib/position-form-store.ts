import { createEvent, createStore, sample } from "effector";

// #region name field
export const $nameField = createStore<string>("");
export const changeNameField = createEvent<string>();
sample({
  clock: changeNameField,
  target: $nameField,
});
// #endregion name field

// #region parentId field
export const $parentIdField = createStore<number | null>(null);
export const changeParentIdField = createEvent<number | null>();
sample({
  clock: changeParentIdField,
  target: $parentIdField,
});
// #endregion parentId field
