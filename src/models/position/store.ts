import * as api from "api/position-api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { Position } from "./types";

//#region old CRUD
export const addPosition = createEvent<Position>("add position");
const addPositionHandler = (
  state: Position[],
  newPosition: Position
): Position[] => {
  const newId = Math.max(...state.map((position) => position.id)) + 1;
  return [...state, { ...newPosition, id: newId }];
};

export const updatePosition = createEvent<Position>("update position");
const updatePositionHandler = (
  state: Position[],
  changedPosition: Position
): Position[] => {
  const itemIndex = state.findIndex(
    (position) => position.id === changedPosition.id
  );
  if (itemIndex === -1) {
    throw new Error("Position not found");
  }
  state.splice(itemIndex, 1, changedPosition);
  return [...state];
};
//#endregion old CRUD

export const $positions = createStore<Position[]>([])
  .on(addPosition, addPositionHandler)
  .on(updatePosition, updatePositionHandler);

//#region fetch all
export const fetchAll = createEvent();
const fetchAllPositionsFx = createEffect(() => {
  return api.fetchAllPositions();
});

sample({ clock: fetchAll, target: fetchAllPositionsFx });
sample({
  clock: fetchAllPositionsFx.doneData,
  target: $positions,
  //#region watch example
  // fn: (data) => {
  //   console.log(data);
  //   return data;
  // },
  //#endregion watch example
});
//#endregion fetch all

//#region delete position
export const removePosition = createEvent<number>("remove position");
const deletePositionFx = createEffect((positionId: number) => {
  api.deletePosition(positionId);
});
sample({ clock: removePosition, target: deletePositionFx });
sample({ clock: deletePositionFx, target: fetchAllPositionsFx });
//#endregion delete position

//#region for view
export const $positionsWithParentName = $positions.map((positions) => {
  return positions.map((position) => ({
    ...position,
    parentName: positions.find((parent) => parent.id === position.parentId)
      ?.name,
  }));
});
//#endregion for view
