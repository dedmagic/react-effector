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
// TODO: почему я не могу положить в стор `undefined`?
// "Uncaught Error: current state can't be undefined, use null instead"
// export const $parentIdField = createStore<number | undefined>(undefined);
export const $parentIdField = createStore<number | undefined>(0);

export const changeParentIdField = createEvent<number | undefined>();

sample({
  clock: changeParentIdField,
  target: $parentIdField,
});
// #endregion parentId field
