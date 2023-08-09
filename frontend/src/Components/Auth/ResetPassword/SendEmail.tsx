import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { appRoutes } from "../../../utils/config";
import { useState } from "react";
import "./SendEmail.scss";
import LangModel from "../../../languageControl/Language";
import useAuthService from "../../../services/authService";

interface props {
  data: LangModel;
}

function SendEmail(props: props): JSX.Element {
  const data = props.data.SendEmail;
  const authService = useAuthService();
  const { register, handleSubmit } = useForm<any>();
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [timer, setTimer] = useState(30);

  const sendEmail = async (data: any) => {
    setIsDisabled(true);
    const result = await authService.forgotPassword(data.email);
    if (result.status === 200) {
      setIsEmailSent(true);
      setTimer(30);
      startTimer();
      return;
    }
    setIsDisabled(false);
  };

  const startTimer = () => {
    if (timer > 0) {
      const timerId = setInterval(() => {
        setTimer((lastTimer) => {
          if (lastTimer <= 1) {
            setIsDisabled(false);
            clearInterval(timerId);
            return 30;
          }
          if (lastTimer <= 0) return lastTimer;
          return lastTimer - 1;
        });
      }, 1000);
    }
  };

  return (
    <>
      <form className="SendEmail">
        <h3>{data.header}</h3>
        {!isEmailSent && (
          <span className="description">{data.description}</span>
        )}
        {isEmailSent && (
          <span className="email-sent-msg">{data.emailSent}</span>
        )}
        <div className="form-input-area">
          <input
            type="email"
            className="form-control"
            {...register("email")}
            required
          />
        </div>
        <div className="forgot-password-buttons">
          <button
            className="auth-search-button"
            onClick={handleSubmit(sendEmail)}
            disabled={isDisabled}
          >
            {data.searchBtn}
          </button>
          <Link className="cancel-button" to={appRoutes.auth.login}>
            {data.cancelBtn}
          </Link>
        </div>
        {isDisabled && isEmailSent && (
          <span className="timer-msg">
            {data.tryAgain} {timer} {data.seconds}
          </span>
        )}
      </form>
    </>
  );
}

export default SendEmail;
