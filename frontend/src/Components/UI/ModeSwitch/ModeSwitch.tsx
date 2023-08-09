import { useDispatch } from "react-redux";
import { UserModes, userActions } from "../../../store/authSlice";
import { useEffect, useState } from "react";
import "./ModeSwitch.scss";

interface props {
  isSeller: boolean;
  data: any;
}

export default function ModeSwitch(props: props) {
  const data = props.data;
  const dispatch = useDispatch();
  const initText = props.isSeller ? data.seller : data.buyer;
  const [currentText, setCurrentText] = useState(initText);

  const switchClick = () => {
    const changeTo = props.isSeller ? UserModes.BUYER : UserModes.SELLER;
    dispatch(userActions.setMode(changeTo));
    setCurrentText("");
    setTimeout(() => {
      setCurrentText(props.isSeller ? data.buyer : data.seller);
    }, 300);
  };

  useEffect(() => {
    setCurrentText(props.isSeller ? data.seller : data.buyer);
  }, [data.buyer, data.seller, props]);

  return (
    <div className="ModeSwitch">
      <label htmlFor="" className="switch" onClick={switchClick}>
        <input type="checkbox" />
        <span className={`slider round ${props.isSeller ? "" : "buyer"}`}>
          {currentText}
        </span>
      </label>
    </div>
  );
}
