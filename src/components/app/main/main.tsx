import { BrowserRouter } from "react-router-dom";

import "./main.css";
import { MainContent } from "./content/content";
import { MainMenu } from "./menu/menu";

export const AppMain = () => {
  return (
    <div className="app-main">
      <BrowserRouter>
        <MainMenu />
        <MainContent />
      </BrowserRouter>
    </div>
  );
};
