import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { IStore } from "../store/store";
import "../styles/globals.scss";

function RootLayout(): JSX.Element {
  const language = useSelector((state: IStore) => state.language.language);
  const isHebrew = language === "HEBREW";
  return (
    <div
      className={isHebrew ? "root-hebrew-language" : "root-english-language"}
    >
      <Outlet />
    </div>
  );
}

export default RootLayout;
