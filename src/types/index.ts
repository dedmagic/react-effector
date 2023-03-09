import { ReactNode } from "react";

export type Nullable<T> = T | null;

export type EntityActionHandlerById = (id: number) => void;
export type EntityActionHandlerByEntity<T> = (entity: T) => void;

export type RenderFunction = (row?: any) => ReactNode;

export const NO_ERRORS = "no errors";
