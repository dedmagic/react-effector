export const NO_ERRORS = "no errors";
export type ValidationResult = string[] | typeof NO_ERRORS;

export type EntityActionHandlerById = (id: number) => void;
export type EntityActionHandlerByEntity<T> = (entity: T) => void;
