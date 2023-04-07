import { ReactNode } from "react";

import "./card.css";

export interface CardProps {
  title?: string;
  children?: ReactNode;
}

export const Card = ({ title, children }: CardProps) => {
  return (
    <div className="card main-content__card">
      {title && <p className="card__title">{title}</p>}
      {children}
    </div>
  );
};
