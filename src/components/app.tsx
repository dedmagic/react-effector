import "./app.css";

import { AppFooter } from "./app-footer/app-footer";
import { AppHeader } from "./app-header/app-header";
import { AppMain } from "./app-main/app-main";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import { Employees } from "./pages/employees/employees";
import { Errands } from "./pages/errands/errands";

export const App = () => {
  return (
    <BrowserRouter>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/errands">Поручения</Link>
            </li>
            <li>
              <Link to="/employees">Сотрудники</Link>
            </li>
            <li>
              <Link to="/">Главная</Link>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/errands" element={<Errands />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
  // return (
  //   <div className="app-wrapper">
  //     <AppHeader />
  //     <AppMain />
  //     <AppFooter />
  //   </div>
  // );
};

export default App;
