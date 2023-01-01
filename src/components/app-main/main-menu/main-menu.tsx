/* eslint-disable jsx-a11y/anchor-is-valid */
import "./main-menu.css";

export const MainMenu = () => {
  return (
    <div className="main-menu">
      <ul className="business-logic-menu">
        <li>
          <a href="#">
            {/* <i className="fa fa-person-digging"></i>Поручения */}
            <i className="fa fa-person-walking-arrow-right"></i>Поручения
          </a>
        </li>
        <li>
          <a href="#">
            {/* <i className="fa fa-person-praying"></i>Сотрудники */}
            {/* <i className="fa fa-users"></i>Сотрудники */}
            <i className="fa fa-people-group"></i>Сотрудники
          </a>
        </li>
        <li>
          <a href="#">
            {/* <i className="fa fa-user-tie"></i>Должности */}
            <i className="fa-regular fa-address-card"></i>Должности
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa fa-chart-line"></i>Аналитика
          </a>
        </li>
      </ul>
      <ul className="support-menu">
        <li>
          <a href="#">
            <i className="fa fa-gear"></i>
            Настройки
          </a>
        </li>
        <li>
          <a href="#">
            <i className="fa-regular fa-circle-question"></i>
            Помощь
          </a>
        </li>
      </ul>
    </div>
  );
};
