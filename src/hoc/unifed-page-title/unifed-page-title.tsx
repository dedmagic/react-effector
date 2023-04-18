import { PageTitle } from "shared";

interface UnifedPageTitleProps {
  title: string;
}

export const UnifedPageTitle = ({ title }: UnifedPageTitleProps) => {
  return <PageTitle title={title} mixCssClasses="main-content__page-title" />;
};
