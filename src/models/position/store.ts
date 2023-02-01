import * as api from "api/position-api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { Position } from "./types";

export const addPosition = createEvent<Position>("add position");
const addPositionHandler = (
  state: Position[],
  newPosition: Position
): Position[] => {
  const newId = Math.max(...state.map((position) => position.id)) + 1;
  return [...state, { ...newPosition, id: newId }];
};

// export const removePosition = createEvent<number>("remove position");
// const removePositionHandler = (
//   state: Position[],
//   positionId: number
// ): Position[] => {
//   return state.filter((position) => position.id !== positionId);
// };

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

export const $positions = createStore<Position[]>([])
  .on(addPosition, addPositionHandler)
  // .on(removePosition, removePositionHandler)
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
  // fn: (data) => {
  //   console.log(data);
  //   return data;
  // },
});
//#endregion fetch all

//#region delete position
export const removePosition = createEvent<number>("remove position");
const deletePositionFx = createEffect<number>((positionId): number => {});
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
