// TODO: убрать `export`
export const HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
};

export async function getQuery<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function deleteQuery(url: string): Promise<boolean> {
  const response = await fetch(url, { method: "DELETE" });
  return response.ok;
}
