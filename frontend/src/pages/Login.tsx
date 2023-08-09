import { useSelector } from "react-redux";
import LoginForm from "../Components/Auth/LoginForm/LoginForm";
import { IStore } from "../store/store";

function LoginPage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  return <LoginForm data={langData} />;
}

export default LoginPage;
