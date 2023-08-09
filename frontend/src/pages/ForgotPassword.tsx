import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import SendEmail from "../Components/Auth/ResetPassword/SendEmail";

function ForgotPasswordPage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  return <SendEmail data={langData} />;
}

export default ForgotPasswordPage;
