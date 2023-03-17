import { businessLogicMenuItems, supportMenuItems } from "./main-menu-items";
import "./main-menu.css";

import { MainMenuItem } from "./main-menu-item";

export const MainMenu = () => {
  return (
    <div className="main-menu">
      <ul>
        {businessLogicMenuItems.map((menuItem) => (
          <li key={menuItem.path}>
            <MainMenuItem
              path={menuItem.path}
              icon={menuItem.icon}
              label={menuItem.label}
            />
          </li>
        ))}
      </ul>
      <ul>
        {supportMenuItems.map((menuItem) => (
          <li key={menuItem.path}>
            <MainMenuItem
              path={menuItem.path}
              icon={menuItem.icon}
              label={menuItem.label}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
