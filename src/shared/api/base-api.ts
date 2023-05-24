export async function getQuery<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

export async function deleteQuery(url: string): Promise<boolean> {
  const response = await fetch(url, { method: "DELETE" });
  return response.ok;
}

async function mutationQuery<T>(
  url: string,
  payload: T,
  httpMethod: "PUT" | "POST" | "PATCH"
): Promise<boolean> {
  const response = await fetch(url, {
    method: httpMethod,
    body: JSON.stringify(payload),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return response.ok;
}

export const updateQuery = async <T>(
  url: string,
  payload: T
): Promise<boolean> => mutationQuery(url, payload, "PUT");

export const createQuery = async <T>(
  url: string,
  payload: T
): Promise<boolean> => mutationQuery(url, payload, "POST");
