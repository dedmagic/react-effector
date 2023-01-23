export type NullableNumber = number | null;

export type EntityActionHandlerById = (id: number) => void;
export type EntityActionHandlerByEntity<T> = (entity: T) => void;
