import { Position } from "models/position";

const API_URL = "http://localhost:3003";

export const fetchAllPositions = async (): Promise<Position[]> => {
  const url = `${API_URL}/positions`;
  return fetch(url)
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
