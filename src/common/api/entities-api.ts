import { deleteQuery, getQuery } from "./base-api";

async function getAllEntities<T>(url: string): Promise<T[]> {
  return getQuery<T[]>(url);
}

async function deleteEntity(
  baseUrl: string,
  entityId: number
): Promise<boolean> {
  const url = `${baseUrl}/${entityId}`;
  return deleteQuery(url);
}

export const api = {
  getAllEntities: getAllEntities,
  deleteEntity: deleteEntity,
};
