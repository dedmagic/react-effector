import { API_URL, HEADERS, api } from "api";

import { Position } from "modules/position";

const POSITIONS_API_URL = `${API_URL}/positions`;

export const fetchAllPositions = () =>
  api.getAllEntities<Position>(POSITIONS_API_URL);

export const deletePosition = async (positionId: number): Promise<boolean> => {
  const url = `${POSITIONS_API_URL}/${positionId}`;
  const response = await fetch(url, { method: "DELETE" });
  return response.ok;
};

export const updatePosition = async (position: Position) => {
  const url = `${POSITIONS_API_URL}/${position.id}`;
  const response = await fetch(url, {
    method: "PUT",
    body: JSON.stringify(position),
    headers: HEADERS,
  });
  return response.ok;
};

export const createPosition = async (position: Position) => {
  const response = await fetch(POSITIONS_API_URL, {
    method: "POST",
    body: JSON.stringify(position),
    headers: HEADERS,
  });
  return response.ok;
};
