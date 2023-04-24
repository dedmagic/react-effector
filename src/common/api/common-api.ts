// TODO: убрать `export`
export const HEADERS = {
  "Content-type": "application/json; charset=UTF-8",
};

export async function get<T>(url: string): Promise<T> {
  console.info(url);
  const response = await fetch(url);
  const result = await response.json();
  return result;
}
