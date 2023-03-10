import { createApi, createStore } from "effector";

import { Nullable } from "types/types";

// #region name field
export const $nameField = createStore<string>("");
export const { changeNameField } = createApi($nameField, {
  changeNameField: (_, newValue: string) => newValue,
});
// #endregion name field

// #region parentId field
export const $parentIdField = createStore<Nullable<number>>(null);
export const { changeParentIdField } = createApi($parentIdField, {
  changeParentIdField: (_, newValue: Nullable<number>) => newValue,
});
// #endregion parentId field
