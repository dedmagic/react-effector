import "./app.css";

import { AppFooter } from "./footer/footer";
import { AppHeader } from "./header/header";
import { AppMain } from "./main/main";

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
