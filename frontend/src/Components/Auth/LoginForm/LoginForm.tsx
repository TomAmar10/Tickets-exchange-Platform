import { Link, useNavigate, useNavigation } from "react-router-dom";
import { User } from "../../../models/User";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { userActions } from "../../../store/authSlice";
import { useEffect, useState } from "react";
import PlatformsAuth from "../PlatformsAuth/PlatformsAuth";
import { appRoutes } from "../../../utils/config";
import LangModel from "../../../languageControl/Language";
import useAuthService from "../../../services/authService";
import "./LoginForm.scss";

interface props {
  data: LangModel;
}

function LoginForm(props: props): JSX.Element {
  const data = props.data.LoginForm;
  const authService = useAuthService();
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";
  const { register, handleSubmit, watch } = useForm<User>();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const watchEmail = watch("email");
  const watchPassword = watch("password");

  useEffect(() => {
    if (error) setError(null);
  }, [watchEmail, watchPassword]);

  const login = async (user: User) => {
    const result = await authService.login(user);
    if (result.status === 200) {
      const { authorization, refreshtoken } = result.headers;
      const { image } = result.data;
      dispatch(userActions.login({ authorization, refreshtoken, image }));
      navigate(appRoutes.chooseMode);
    } else setError("Your email or password is incorrect. Please check again.");
  };

  return (
    <>
      <form className="LoginForm" onSubmit={handleSubmit(login)}>
        <h3>{data.header}</h3>
        <div className="form-input-area">
          <input
            placeholder={data.email}
            type="email"
            className="form-control"
            {...register("email")}
            required
          />
        </div>
        <div className="form-input-area">
          <input
            placeholder={data.password}
            type="password"
            className="form-control"
            {...register("password")}
            required
          />
        </div>
        <button className="auth-login-button" disabled={isSubmitting}>
          {data.loginBtn}
        </button>
        {error && <span className="error-message">{error}</span>}
        <PlatformsAuth data={props.data} loginPage />
        <div className="auth-links-area">
          <Link to={appRoutes.auth.forgotPassword} className="form-link">
            {data.forgotPassword}
          </Link>
          <Link to={appRoutes.auth.register} className="form-link">
            {data.newAccount}
          </Link>
        </div>
      </form>
    </>
  );
}

export default LoginForm;
