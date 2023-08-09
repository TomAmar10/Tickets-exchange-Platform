import { Outlet } from "react-router-dom";
import HotixTitle from "../Components/HotixTitle/HotixTitle";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import UserPageHead from "../Components/UserPageHead/UserPageHead";

function UserLayoutPage(): JSX.Element {
  const language = useSelector((state: IStore) => state.language.language);
  const user = useSelector((state: IStore) => state.user.user);
  return (
    <main className="user-layout">
        <HotixTitle isHebrew={language === "HEBREW"} profilePage />
      <div className="page-container">
        <UserPageHead user={user} />
      <Outlet />
      </div>
    </main>
  );
}

export default UserLayoutPage;
