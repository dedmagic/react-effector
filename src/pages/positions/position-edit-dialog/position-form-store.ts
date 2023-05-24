import { createApi, createEvent, createStore, sample } from "effector";

import { Nullable } from "shared/types/common-types";

import { Position } from "entities/position";

//#region name field
export const $nameField = createStore<string>("");
export const { changeNameField, setNameField } = createApi($nameField, {
  changeNameField: (_, newValue: string) => newValue,
  setNameField: (_, position: Position) => position.name,
});
//#endregion name field

//#region parentId field
export const $parentIdField = createStore<Nullable<number>>(null);
export const { changeParentIdField, setParentIdField } = createApi(
  $parentIdField,
  {
    changeParentIdField: (_, newValue: Nullable<number>) => newValue,
    setParentIdField: (_, position: Position) => position.parentId,
  }
);
//#endregion parentId field

//#region set all fields
export const setAllFields = createEvent<Position>();
sample({
  clock: setAllFields,
  target: [setNameField, setParentIdField],
});
//#endregion set all fields
