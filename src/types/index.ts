export type NullableNumber = number | null;

export type HandlerById = (id: number) => void;
export type HandlerByEntity<T> = (entity: T) => void;
