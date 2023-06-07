import { createEffect, createEvent, createStore, sample } from 'effector';

import { api, ERROR_MSG } from 'shared/api';
import { API_URL } from 'shared/config';

import { Errand } from './';

const ERRAND_API_URL = `${API_URL}/errands`;

export const $errands = createStore<Errand[]>([]);

//#region fetch all
export const fetchAllErrands = createEvent();
const fetchAllErrandsFx = createEffect(() => {
  return api.getAllEntities<Errand>(ERRAND_API_URL);
});

sample({ clock: fetchAllErrands, target: fetchAllErrandsFx });
sample({
  clock: fetchAllErrandsFx.doneData,
  target: $errands,
});
sample({
  clock: fetchAllErrandsFx.fail,
  fn: () => console.error(ERROR_MSG.GET_REQUEST),
});
//#endregion fetch all

//#region delete errand
export const removeErrand = createEvent<number>('remove errand');
const deleteErrandFx = createEffect(async (errandId: number) => {
  const result = await api.deleteEntity(ERRAND_API_URL, errandId);
  console.info(`api call result: ${result}`);
});
sample({ clock: removeErrand, target: deleteErrandFx });
sample({ clock: deleteErrandFx.done, target: fetchAllErrandsFx });
sample({
  clock: deleteErrandFx.fail,
  fn: () => console.error(ERROR_MSG.DELETE_REQUEST),
});
//#endregion delete errand

//#region update errand
export const updateErrand = createEvent<Errand>('update errand');
const updateErrandFx = createEffect(async (errand: Errand) => {
  const result = await api.updateEntity(ERRAND_API_URL, errand);
  console.info(`api call result: ${result}`);
});
sample({ clock: updateErrand, target: updateErrandFx });
sample({ clock: updateErrandFx.doneData, target: fetchAllErrandsFx });
sample({
  clock: updateErrandFx.fail,
  fn: () => console.error(ERROR_MSG.UPDATE_REQUEST),
});
//#endregion update errand

//#region create errand
export const createErrand = createEvent<Errand>('create new errand');
const createErrandFx = createEffect(async (errand: Errand) => {
  const result = await api.createEntity(ERRAND_API_URL, errand);
  console.info(`api call result: ${result}`);
});
sample({ clock: createErrand, target: createErrandFx });
sample({ clock: createErrandFx.done, target: fetchAllErrands });
sample({
  clock: createErrandFx.fail,
  fn: () => console.error(ERROR_MSG.CREATE_REQUEST),
});
//#endregion create errand
