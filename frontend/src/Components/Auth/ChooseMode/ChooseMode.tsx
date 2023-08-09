import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { userActions, UserModes } from "../../../store/authSlice";
import { User } from "../../../models/User";
import LangModel from "../../../languageControl/Language";
import "./ChooseMode.scss";

interface props {
  user: User;
  data: LangModel;
}

function ChooseMode(props: props): JSX.Element {
  const data = props.data.ChooseMode;
  const dispatch = useDispatch();
  const setSeller = () => dispatch(userActions.setMode(UserModes.SELLER));
  const setBuyer = () => dispatch(userActions.setMode(UserModes.BUYER));

  return (
    <div className="ChooseMode">
      <h1 className="sell-buy-greet-user">
        {data.hey}
        {`${props.user.first_name} ${props.user.last_name}`.toUpperCase()}
      </h1>
      <div className="choose">
        <span>{data.whatToDo}</span>
        <div className="choose-buttons-area">
          <NavLink to="/">
            <button className="sell-ticket-btn" onClick={setSeller}>
              {data.sellBtn}
            </button>
          </NavLink>
          <NavLink to="/">
            <button className="buy-ticket-btn" onClick={setBuyer}>
              {data.buyBtn}
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default ChooseMode;
