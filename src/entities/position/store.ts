import { createEffect, createEvent, createStore, sample } from 'effector';

import { ERROR_MSG } from 'shared/api';

import * as api from './api';
import { Position } from '.';

export const $positions = createStore<Position[]>([]);

//#region fetch all
export const fetchAllPositions = createEvent();
export const fetchAllPositionsFx = createEffect(() => {
  return api.fetchAllPositions();
});

sample({ clock: fetchAllPositions, target: fetchAllPositionsFx });
sample({
  clock: fetchAllPositionsFx.doneData,
  target: $positions,
});
sample({
  clock: fetchAllPositionsFx.failData,
  fn: () => console.error(ERROR_MSG.GET_REQUEST),
});
//#endregion fetch all

//#region delete position
export const removePosition = createEvent<number>('remove position');
const deletePositionFx = createEffect(async (positionId: number) => {
  const result = await api.deletePosition(positionId);
  console.info(`api call result: ${result}`);
});
sample({ clock: removePosition, target: deletePositionFx });
sample({ clock: deletePositionFx.done, target: fetchAllPositionsFx });
sample({
  clock: deletePositionFx.failData,
  fn: () => console.error(ERROR_MSG.DELETE_REQUEST),
});
//#endregion delete position

//#region update position
export const updatePosition = createEvent<Position>('update position');
const updatePositionFx = createEffect(async (position: Position) => {
  const result = await api.updatePosition(position);
  console.info(`api call result: ${result}`);
});
sample({ clock: updatePosition, target: updatePositionFx });
sample({ clock: updatePositionFx.done, target: fetchAllPositionsFx });
sample({
  clock: updatePositionFx.failData,
  fn: () => console.error(ERROR_MSG.UPDATE_REQUEST),
});
//#endregion update position

//#region create position
export const createPosition = createEvent<Position>('create new position');
const createPositionFx = createEffect(async (position: Position) => {
  const result = await api.createPosition(position);
  console.info(`api call result: ${result}`);
});
sample({ clock: createPosition, target: createPositionFx });
sample({ clock: createPositionFx.done, target: fetchAllPositionsFx });
sample({
  clock: createPositionFx.failData,
  fn: () => console.error(ERROR_MSG.CREATE_REQUEST),
});
//#endregion create position

//#region for view
export const $positionsWithParentName = $positions.map((positions) => {
  return positions.map((position) => ({
    ...position,
    parentName: positions.find((parent) => parent.id === position.parentId)
      ?.name,
  }));
});
//#endregion for view
