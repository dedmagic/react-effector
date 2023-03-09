import "./header.css";

import { AppLogo } from "./logo/logo";
import { AppTitle } from "./title/title";

export const AppHeader = () => {
  return (
    <header className="app-header">
      <AppLogo />
      <AppTitle />
    </header>
  );
};
