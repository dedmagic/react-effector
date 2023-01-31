import * as api from "api/position-api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { positionsMock } from "../mocks";
import { Position } from "./types";

export const addPosition = createEvent<Position>("add position");
const addPositionHandler = (
  state: Position[],
  newPosition: Position
): Position[] => {
  const newId = Math.max(...state.map((position) => position.id)) + 1;
  return [...state, { ...newPosition, id: newId }];
};

export const removePosition = createEvent<number>("remove position");
const removePositionHandler = (
  state: Position[],
  positionId: number
): Position[] => state.filter((position) => position.id !== positionId);

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

// TODO: Убрать использование мока после реализации работы с API
// export const $positions = createStore<Position[]>(positionsMock)
export const $positions = createStore<Position[]>([])
  .on(addPosition, addPositionHandler)
  .on(removePosition, removePositionHandler)
  .on(updatePosition, updatePositionHandler);

export const fetchAll = createEvent();
const fetchAllPositionsFx = createEffect(() => {
  console.log("I'm here!");
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

export const $positionsWithParentName = $positions.map((positions) => {
  return positions.map((position) => ({
    ...position,
    parentName: positions.find((parent) => parent.id === position.parentId)
      ?.name,
  }));
});
