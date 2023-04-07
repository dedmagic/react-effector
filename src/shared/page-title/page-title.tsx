interface PageTitleProps {
  title: string;
}
export const PageTitle = ({ title }: PageTitleProps) => {
  return <h4 className="main-content__page-title">{title}</h4>;
};
