import { ReactNode } from "react";

import { NO_ERRORS } from "./consts";

export type Nullable<T> = T | null;

export type EntityActionHandlerById = (id: number) => void;
export type EntityActionHandlerByEntity<T> = (entity: T) => void;

export type RenderFunction = (row?: any) => ReactNode;

export type ValidationResult = string[] | typeof NO_ERRORS;
