import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserModes } from "../../store/authSlice";
import { IStore } from "../../store/store";
import ModeSwitch from "../UI/ModeSwitch/ModeSwitch";
import { languageAction } from "../../store/languageSlice";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import LanguageIcon from "@mui/icons-material/Language";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "./TopNavbar.scss";

function TopNavbar(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const data = langData.TopNavbar;
  const user = useSelector((state: IStore) => state.user.user);
  const userMode = useSelector((state: IStore) => state.user.mode);
  const dispatch = useDispatch();

  const toggleLang = (language: string) => {
    dispatch(languageAction.setLanguage(language));
  };

  return (
    <div className="TopNavbar">
      <div className="header-navigator">
        {user && (
          <>
            <ModeSwitch
              isSeller={userMode === UserModes.SELLER}
              data={data.modeSwitch}
            />
            <NotificationsActiveIcon className="icon" />
            <FavoriteIcon className="icon" />
          </>
        )}
        <div className="language-area">
          <LanguageIcon className="icon" />
          <div className="lang-menu">
            <div
              className="single-language"
              onClick={() => toggleLang("ENGLISH")}
            >
              {data.english}
            </div>
            <hr />
            <div
              className="single-language"
              onClick={() => toggleLang("HEBREW")}
            >
              {data.hebrew}
            </div>
          </div>
        </div>
        {!user && (
          <>
            <NavLink to={"/auth"} className="header-btn">
              {data.login}
            </NavLink>
          </>
        )}
      </div>
      <h5 className="hotix-header">Hotix</h5>
    </div>
  );
}

export default TopNavbar;
