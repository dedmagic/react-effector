import "./main-menu.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";

import {
  Analytics,
  Employees,
  Errands,
  Help,
  JobTitles,
  Settings,
} from "../../pages";

export const MainMenu = () => {
  return (
    <BrowserRouter>
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

      <main>
        <Routes>
          <Route path="/help" element={<Help />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/job-titles" element={<JobTitles />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/errands" element={<Errands />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};
