import "./app-header.css";

import { AppLogo } from "./app-logo/app-logo";
import { AppTitle } from "./app-title/app-title";

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
