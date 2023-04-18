import { ReactNode } from "react";
import classNames from "classnames";

import { BemMix } from "types";

import "./card.css";

export interface CardProps extends BemMix {
  title?: string;
  children?: ReactNode;
}

export const Card = ({ title, children, mixCssClasses }: CardProps) => {
  const cssClasses = classNames("card", mixCssClasses);
  return (
    <div className={cssClasses}>
      {title && <p className="card__title">{title}</p>}
      {children}
    </div>
  );
};
