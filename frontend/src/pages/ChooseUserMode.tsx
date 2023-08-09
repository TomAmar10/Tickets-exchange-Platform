import { useDispatch, useSelector } from "react-redux";
import ChooseMode from "../Components/Auth/ChooseMode/ChooseMode";
import { IStore } from "../store/store";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { appRoutes } from "../utils/config";
import { userActions } from "../store/authSlice";
import useAuthService from "../services/authService";

function ChooseUserModePage(): JSX.Element {
  const user = useSelector((state: IStore) => state.user.user);
  const langData = useSelector((state: IStore) => state.language.langData);
  const language = useSelector((state: IStore) => state.language.language);
  const authService = useAuthService();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const loginCase = searchParams.get("case");

  useEffect(() => {
    if (user) return;
    if (loginCase === "passport") {
      authService
        .checkPassportUser()
        .then((res) => {
          if (res.status !== 201) return navigate(appRoutes.auth.register);
          const { authorization, refreshtoken } = res.headers;
          const { image } = res.data;
          dispatch(userActions.login({ authorization, refreshtoken, image }));
          navigate(appRoutes.chooseMode);
        })
        .catch(() => navigate(appRoutes.auth.register));
    }
  }, [dispatch, loginCase, navigate, user]);

  return (
    <main className={`container-main ${language === "HEBREW" && "hebrew"}`}>
      {user && <ChooseMode user={user} data={langData} />}
    </main>
  );
}

export default ChooseUserModePage;
