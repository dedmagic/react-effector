import "./menu.css";

import { MainMenuItem } from "./menu-item";

export const MainMenu = () => {
  return (
    <div className="main-menu">
      <ul>
        {getBusinessLogicMenuItems().map((menuItem) => (
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
        {getSupportMenuItems().map((menuItem) => (
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

function getBusinessLogicMenuItems() {
  return [
    {
      path: "/errands",
      icon: "fa fa-person-walking-arrow-right",
      label: "Поручения",
    },
    {
      path: "/employees",
      icon: "fa fa-people-group",
      label: "Сотрудники",
    },
    {
      path: "/positions",
      icon: "fa-regular fa-address-card",
      label: "Должности",
    },
    {
      path: "/analytics",
      icon: "fa fa-chart-line",
      label: "Аналитика",
    },
  ];
}

function getSupportMenuItems() {
  return [
    {
      path: "/settings",
      icon: "fa fa-gear",
      label: "Настройки",
    },

    {
      path: "/help",
      icon: "fa-regular fa-circle-question",
      label: "Помощь",
    },
  ];
}
