import "./errors-list-item.css";

interface ErrorsListItemProps {
  error: string;
}

export const ErrorsListItem = ({ error }: ErrorsListItemProps) => (
  <li className="errors-list-item">{error}</li>
);
