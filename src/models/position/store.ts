import * as api from "api/position-api";
import { createEffect, createEvent, createStore } from "effector";
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

const getAllPositionsFx = createEffect("get all positions").use(() =>
  api.getAllPositions().then((res) => res)
);

// api.getAllPositions().then((res) => {
//   console.log(res);
// });

// TODO: Убрать использование мока после реализации работы с API
// export const $positions = createStore<Position[]>()
export const $positions = createStore<Position[]>(positionsMock)
  .on(addPosition, addPositionHandler)
  .on(removePosition, removePositionHandler)
  .on(updatePosition, updatePositionHandler);

export const $positionsWithParentName = $positions.map((positions) => {
  return positions.map((position) => ({
    ...position,
    parentName: positions.find((parent) => parent.id === position.parentId)
      ?.name,
  }));
});
