import { useNavigate } from "react-router-dom";
import "./HotixTitle.scss";

interface props {
  profilePage?: boolean;
  isHebrew?: boolean;
}

function HotixTitle(props: props): JSX.Element {
  const navigate = useNavigate();
  const navigateHome = () => navigate("/");
  return (
    <div
      className={`HotixTitle ${props.profilePage && "profile-page"} ${
        props.isHebrew && "hebrew"
      }`}
    >
      <h1 className="part1" onClick={navigateHome}>
        Ho
      </h1>
      <h1 className="part2" onClick={navigateHome}>
        tix
      </h1>
    </div>
  );
}

export default HotixTitle;
