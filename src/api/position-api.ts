import { Position } from "models/position";

const API_URL = "http://localhost:3003";

export const getAllPositions = async (): Promise<Position[]> => {
  const url = `${API_URL}/positions`;

  let res: Position[] = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("### → file: position-api.ts:12 → .then → data", data);
      res = data;
    })
    .catch((error) => console.log(error));
  return res;
};
