import { Outlet } from "react-router-dom";
import AuthContainer from "../Components/Auth/AuthContainer";
import { useSelector } from "react-redux";
import { IStore } from "../store/store";

function AuthLayoutPage(): JSX.Element {
  const language = useSelector((state: IStore) => state.language.language);
  return (
    <AuthContainer language={language}>
      <Outlet />
    </AuthContainer>
  );
}

export default AuthLayoutPage;
