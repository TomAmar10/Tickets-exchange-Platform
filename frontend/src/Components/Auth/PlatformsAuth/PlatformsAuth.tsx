import config from "../../../utils/config";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import { logoImages } from "../../../utils/file-import";
import "./PlatformsAuth.scss";
import LangModel from "../../../languageControl/Language";

interface props {
  data: LangModel;
  loginPage?: boolean;
}

function PlatformsAuth(props: props): JSX.Element {
  const data = props.data.PlatformsAuth;

  const platformConnect = (platform: "facebook" | "google") => {
    window.open(
      `${process.env.REACT_APP_API_URL}${config.authURL[platform]}`,
      "_self"
    );
  };

  return (
    <div className="PlatformsAuth">
      <div className="or-separator">
        <hr />
        <span>{data.or}</span>
        <hr />
      </div>
      <div
        className={`connect-with-platforms ${props.loginPage && "login-page"}`}
      >
        <div
          className="platform-button"
          onClick={() => platformConnect("facebook")}
        >
          <FacebookRoundedIcon className="facebook-icon" />
          <span className="continue-with">{data.facebook}</span>
        </div>
        <div
          className="platform-button"
          onClick={() => platformConnect("google")}
        >
          <img src={logoImages.google} alt="google" className="google-icon" />
          <span className="continue-with">{data.google}</span>
        </div>
      </div>
    </div>
  );
}

export default PlatformsAuth;
