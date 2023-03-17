import "./app-header.css";

import { AppLogo } from "./app-logo";
import { AppTitle } from "./app-title";

export const AppHeader = () => {
  return (
    <header className="app-header">
      <AppLogo />
      <AppTitle />
    </header>
  );
};
