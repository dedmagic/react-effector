import { Position } from "models/position";

const API_URL = "http://localhost:3003";
const POSITIONS_API_URL = `${API_URL}/positions`;
const HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
};

export const fetchAllPositions = async (): Promise<Position[]> => {
  return fetch(POSITIONS_API_URL)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

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
