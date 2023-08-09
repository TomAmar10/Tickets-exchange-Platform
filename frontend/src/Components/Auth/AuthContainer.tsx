import background from "../../assets/auth-bg2.png";
import HotixTitle from "../HotixTitle/HotixTitle";
import "./AuthContainer.scss";

interface props {
  language: string;
  children: any;
}

function AuthContainer(props: props): JSX.Element {
  const isHebrew = props.language === "HEBREW";
  return (
    <div className={`AuthContainer ${isHebrew && "hebrew"}`}>
      <img src={background} alt="Hotix" className="auth-bg-img" />
      <div className={`forms-container ${isHebrew && "hebrew"}`}>
        <HotixTitle isHebrew={isHebrew} />
        {props.children}
      </div>
    </div>
  );
}

export default AuthContainer;
