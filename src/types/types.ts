import { ReactNode } from "react";

export type NullableNumber = number | null;

export type EntityActionHandlerById = (id: number) => void;
export type EntityActionHandlerByEntity<T> = (entity: T) => void;

export type RenderFunction = (row?: any) => ReactNode;

export type ValidationResult = string[];
export type ValidateFunction<T> = (checkedData: T) => ValidationResult;
