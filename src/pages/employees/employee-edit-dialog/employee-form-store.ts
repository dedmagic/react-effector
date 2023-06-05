import { createApi, createEvent, createStore, sample } from 'effector';

import { Nullable } from 'shared/types';

import { Employee } from 'entities/employee';

// #region name field
export const $nameField = createStore<string>('');
export const { changeNameField, setNameField } = createApi($nameField, {
  changeNameField: (_, newValue: string) => newValue,
  setNameField: (_, employee: Employee) => employee.name,
});
// #endregion name field

// #region positionId field
export const $positionIdField = createStore<Nullable<number>>(null);
export const { changePositionIdField, setPositionIdField } = createApi(
  $positionIdField,
  {
    changePositionIdField: (_, newValue: Nullable<number>) => newValue,
    setPositionIdField: (_, employee: Employee) => employee.positionId,
  }
);
// #endregion positionId field

//#region set all fields
export const setAllFields = createEvent<Employee>();
sample({
  clock: setAllFields,
  target: [setNameField, setPositionIdField],
});
//#endregion set all fields
