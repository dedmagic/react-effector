import { ReactNode } from "react";
import { Card } from "common/components";

interface UnifedCardProps {
  title?: string;
  children?: ReactNode;
}

export const UnifedCard = ({ title, children }: UnifedCardProps) => {
  return (
    <Card
      title={title}
      children={children}
      mixCssClasses="main-content__card"
    />
  );
};
