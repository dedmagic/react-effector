import { ReactNode } from "react";

export type Nullable<T> = T | null;

export type SimpleAction = () => void;

// TODO: может быть надо возвращать JSX.Element?
export type RenderFunction = (row?: any) => ReactNode;

export interface BemMix {
  mixCssClasses?: string;
}
