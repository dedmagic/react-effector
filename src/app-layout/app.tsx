import "./app.css";

import { AppFooter } from "./app-footer";
import { AppHeader } from "./app-header";
import { AppMain } from "./app-main";

export const App = () => {
  return (
    <div className="app">
      <AppHeader />
      <AppMain />
      <AppFooter />
    </div>
  );
};

export default App;
