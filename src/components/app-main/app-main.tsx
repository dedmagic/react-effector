import "./app-main.css";
import { MainMenu } from "./main-menu/main-menu";

export const AppMain = () => {
  return (
    <>
      <div className="app-main">
        <MainMenu />
        <div className="content"></div>
      </div>
    </>
  );
};
