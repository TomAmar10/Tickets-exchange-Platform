import { useSelector } from "react-redux";
import { IStore } from "../store/store";
import RegisterForm from "../Components/Auth/RegisterForm/RegisterForm";

function RegisterPage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const language = useSelector((state: IStore) => state.language.language);
  
  return <RegisterForm data={langData} language={language} />;
}

export default RegisterPage;
