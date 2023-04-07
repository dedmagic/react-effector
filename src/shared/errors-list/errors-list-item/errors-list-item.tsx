interface ErrorsListItemProps {
  error: string;
}

export const ErrorsListItem = ({ error }: ErrorsListItemProps) => (
  <li className="errors-list__item">{error}</li>
);
