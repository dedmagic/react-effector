export const API_URL = process.env.REACT_APP_API_URL;

// TODO: убрать `export`
export const HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
};

// #region common api
async function get<T>(url: string): Promise<T> {
  console.info(url);
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
// #endregion common api

// #region business logic api
async function getAllEntities<T>(url: string): Promise<T[]> {
  return get<T[]>(url);
}
// #endregion business logic api

export const api = {
  getAllEntities: getAllEntities,
};

export const GET_ERROR_MSG =
  "Ошибка взаимодействия с сервером: не удалось загрузить данные";
