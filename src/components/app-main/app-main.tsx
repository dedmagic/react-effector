import { BrowserRouter } from "react-router-dom";

import "./app-main.css";
import { MainContent } from "./main-content/main-content";
import { MainMenu } from "./main-menu/main-menu";

export const AppMain = () => {
  return (
    <>
      <div className="app-main">
        <BrowserRouter>
          <MainMenu />
          <MainContent />
        </BrowserRouter>
      </div>
    </>
  );
};
