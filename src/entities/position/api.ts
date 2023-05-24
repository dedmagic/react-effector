import { api } from "shared/api";
import { API_URL } from "shared/config";

import { Position } from "entities/position";

const POSITION_API_URL = `${API_URL}/positions`;

export const fetchAllPositions = () =>
  api.getAllEntities<Position>(POSITION_API_URL);

export const deletePosition = async (positionId: number): Promise<boolean> => {
  return api.deleteEntity(POSITION_API_URL, positionId);
};

export const updatePosition = async (position: Position) => {
  return api.updateEntity(POSITION_API_URL, position);
};

export const createPosition = async (position: Position) => {
  return api.createEntity(POSITION_API_URL, position);
};
