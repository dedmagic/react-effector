import classNames from "classnames";

import { BemMix } from "common/types";

interface PageTitleProps extends BemMix {
  title: string;
}
export const PageTitle = ({ title, mixCssClasses }: PageTitleProps) => {
  return <h4 className={classNames(mixCssClasses)}>{title}</h4>;
};
