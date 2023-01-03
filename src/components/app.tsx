import "./app.css";

import { AppFooter } from "./app-footer/app-footer";
import { AppHeader } from "./app-header/app-header";
import { AppMain } from "./app-main/app-main";

export const App = () => {
  return (
    <div className="app-wrapper">
      <AppHeader />
      <AppMain />
      <AppFooter />
    </div>
  );
};

export default App;
