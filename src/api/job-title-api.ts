import { Position } from "models/posititon";

const API_URL = "http://localhost:3003";

export const getAllJobTitles = async (): Promise<Position[]> => {
  const url = `${API_URL}/job-titles`;

  let res: Position[] = [];
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("### → file: job-title-api.ts:12 → .then → data", data);
      res = data;
    })
    .catch((error) => console.log(error));
  return res;
};
