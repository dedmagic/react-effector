/* eslint-disable jsx-a11y/anchor-is-valid */
import "./main-menu.css";

export const MainMenu = () => {
  return (
    <div className="main-menu">
      <ul className="business-logic-menu">
        <li>
          <a href="#">Поручения</a>
        </li>
        <li>
          <a href="#">Сотрудники</a>
        </li>
        <li>
          <a href="#">Должности</a>
        </li>
        <li>
          <a href="#">Аналитика</a>
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
