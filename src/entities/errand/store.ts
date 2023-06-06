import { createEffect, createEvent, createStore, sample } from 'effector';

import { ERROR_MSG } from 'shared/api';

import { Errand } from './';
import * as api from './api';

export const $errands = createStore<Errand[]>([]);

//#region fetch all
export const fetchAllErrands = createEvent();
const fetchAllErrandsFx = createEffect(() => {
  return api.fetchAllErrands();
});

sample({ clock: fetchAllErrands, target: fetchAllErrandsFx });
sample({
  clock: fetchAllErrandsFx.doneData,
  target: $errands,
});
sample({
  clock: fetchAllErrandsFx.failData,
  fn: () => console.error(ERROR_MSG.GET_REQUEST),
});
//#endregion fetch all

//#region delete errand
export const removeErrand = createEvent<number>('remove errand');
const deleteErrandFx = createEffect(async (errandId: number) => {
  const result = await api.deleteErrand(errandId);
  console.info(`api call result: ${result}`);
});
sample({ clock: removeErrand, target: deleteErrandFx });
sample({ clock: deleteErrandFx.done, target: fetchAllErrandsFx });
sample({
  clock: deleteErrandFx.failData,
  fn: () => console.error(ERROR_MSG.DELETE_REQUEST),
});
//#endregion delete errand

//#region update errand
export const updateErrand = createEvent<Errand>('update errand');
const updateErrandFx = createEffect(async (errand: Errand) => {
  const result = await api.updateErrand(errand);
  console.info(`api call result: ${result}`);
});
sample({ clock: updateErrand, target: updateErrandFx });
sample({ clock: updateErrandFx.doneData, target: fetchAllErrandsFx });
sample({
  clock: updateErrandFx.failData,
  fn: () => console.error(ERROR_MSG.UPDATE_REQUEST),
});
//#endregion update errand

//#region create errand
//export const
//#endregion create errand
