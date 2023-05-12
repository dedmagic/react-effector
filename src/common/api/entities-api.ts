import { createQuery, deleteQuery, getQuery, updateQuery } from "./base-api";

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

async function updateEntity<T extends { id: number }>(
  baseUrl: string,
  entity: T
): Promise<boolean> {
  const url = `${baseUrl}/${entity.id}`;
  return updateQuery(url, entity);
}

async function createEntity<T>(baseUrl: string, entity: T): Promise<boolean> {
  return createQuery(baseUrl, entity);
}

export const api = {
  getAllEntities,
  deleteEntity,
  updateEntity,
  createEntity,
};
