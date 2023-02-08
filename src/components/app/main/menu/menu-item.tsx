import { Link } from "react-router-dom";

interface MainMenuItemProps {
  path: string;
  icon: string;
  label: string;
}
export const MainMenuItem = ({ path, icon, label }: MainMenuItemProps) => {
  return (
    <Link to={path}>
      <i className={icon}></i>
      {label}
    </Link>
  );
};
