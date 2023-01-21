import "./menu.css";

import { Link } from "react-router-dom";

export const MainMenu = () => {
  return (
    <>
      <div className="main-menu">
        <ul className="business-logic-menu">
          <li>
            <Link to="/errands">
              <i className="fa fa-person-walking-arrow-right"></i>Поручения
            </Link>
          </li>
          <li>
            <Link to="/employees">
              <i className="fa fa-people-group"></i>Сотрудники
            </Link>
          </li>
          <li>
            <Link to="/job-titles">
              <i className="fa-regular fa-address-card"></i>Должности
            </Link>
          </li>
          <li>
            <Link to="/analytics">
              <i className="fa fa-chart-line"></i>Аналитика
            </Link>
          </li>
        </ul>
        <ul className="support-menu">
          <li>
            <Link to="/settings">
              <i className="fa fa-gear"></i>Настройки
            </Link>
          </li>
          <li>
            <Link to="/help">
              <i className="fa-regular fa-circle-question"></i>Помощь
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};
