import { Link, useNavigation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import LangModel from "../../../languageControl/Language";
import "./NewPassword.scss";
import useAuthService from "../../../services/authService";

interface props {
  data: LangModel;
  id: string;
  token: string;
}

function NewPassword(props: props): JSX.Element {
  const data = props.data.NewPassword;
  const authService = useAuthService();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const { register, handleSubmit } = useForm<any>();
  const [error, setError] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  const resetPassword = async (data: any) => {
    const { password, check } = data;
    if (!(password === check)) {
      setError(data.samePasswordErr);
      return;
    }
    const res = await authService.resetPassword(
      props.id,
      props.token,
      password
    );
    if (res.status !== 201) {
      setError(data.tooLongErr);
      return;
    }
    setIsCompleted(true);
  };

  return (
    <>
      <form className="NewPassword" onSubmit={handleSubmit(resetPassword)}>
        <h3>{data.header}</h3>
        {isCompleted && <span className="success-msg">{data.successMsg}</span>}
        <span className="error">{error}</span>
        <div className="form-input-area">
          <input
            disabled={isCompleted}
            placeholder={data.enterPassword}
            type="password"
            className="form-control"
            {...register("password")}
            required
          />
        </div>
        <div className="form-input-area">
          <input
            disabled={isCompleted}
            placeholder={data.confirmPassword}
            type="password"
            className="form-control"
            {...register("check")}
            required
          />
        </div>
        <button
          className="auth-search-button"
          disabled={isSubmitting || isCompleted}
        >
          {data.resetBtn}
        </button>
        <div className="auth-links-area">
          <Link to={"/auth/login"} className="form-link">
            {data.goToLogin}
          </Link>
        </div>
      </form>
    </>
  );
}

export default NewPassword;
