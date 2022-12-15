import "./AppHeader.css";

import { AppLogo } from "./AppLogo/AppLogo";
import { AppTitle } from "./AppTitle/AppTitle";

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
