import * as api from "api/position-api";
import { createEffect, createEvent, createStore, sample } from "effector";
import { Position } from "./types";

//#region old CRUD
// export const addPosition = createEvent<Position>("add position");
// const addPositionHandler = (
//   state: Position[],
//   newPosition: Position
// ): Position[] => {
//   const newId = Math.max(...state.map((position) => position.id)) + 1;
//   return [...state, { ...newPosition, id: newId }];
// };

// export const updatePosition = createEvent<Position>("update position");
// const updatePositionHandler = (
//   state: Position[],
//   changedPosition: Position
// ): Position[] => {
//   const itemIndex = state.findIndex(
//     (position) => position.id === changedPosition.id
//   );
//   if (itemIndex === -1) {
//     throw new Error("Position not found");
//   }
//   state.splice(itemIndex, 1, changedPosition);
//   return [...state];
// };
//#endregion old CRUD

export const $positions = createStore<Position[]>([]);
//   .on(
//   createPosition,
//   addPositionHandler
// );
// .on(updatePosition, updatePositionHandler);

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
const deletePositionFx = createEffect(async (positionId: number) => {
  const result = await api.deletePosition(positionId);
  console.log(result);
});
sample({ clock: removePosition, target: deletePositionFx });
sample({ clock: deletePositionFx.done, target: fetchAllPositionsFx });
//#endregion delete position

//#region update position
export const updatePosition = createEvent<Position>("update position");
const updatePositionFx = createEffect(async (position: Position) => {
  const result = await api.updatePosition(position);
  console.log(result);
});
sample({ clock: updatePosition, target: updatePositionFx });
sample({ clock: updatePositionFx.done, target: fetchAllPositionsFx });
//#endregion update position

//#region create position
export const createPosition = createEvent<Position>("create new position");
const createPositionFx = createEffect(async (position: Position) => {
  const result = await api.createPosition(position);
  console.log(result);
});
sample({ clock: createPosition, target: createPositionFx });
sample({ clock: createPositionFx.done, target: fetchAllPositionsFx });
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
