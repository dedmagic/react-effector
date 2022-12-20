import "./index.css";

import { AppLogo } from "./app-logo";
import { AppTitle } from "./app-title";

export const AppHeader = () => {
  return (
    <>
      <div className="app-header">
        <AppLogo />
        <AppTitle />
      </div>
    </>
  );
};
