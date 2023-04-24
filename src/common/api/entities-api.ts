import { get } from "./common-api";

async function getAllEntities<T>(url: string): Promise<T[]> {
  return get<T[]>(url);
}

export const api = {
  getAllEntities: getAllEntities,
};
