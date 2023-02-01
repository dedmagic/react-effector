import { Position } from "models/position";

const API_URL = "http://localhost:3003";
const POSITIONS_API_URL = `${API_URL}/positions`;

export const fetchAllPositions = async (): Promise<Position[]> => {
  return fetch(POSITIONS_API_URL)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

// export const deletePosition = async (positionId: number): Promise<void> => {
// export const deletePosition = async (positionId: number) => {
export const deletePosition = async (positionId: number): Promise<boolean> => {
  const url = `${POSITIONS_API_URL}/${positionId}`;
  // return fetch(url, { method: "DELETE" })
  //   .then((response) => response)
  //   .catch((error) => console.log(error));
  const response = await fetch(url, { method: "DELETE" });
  return response.ok;
};
