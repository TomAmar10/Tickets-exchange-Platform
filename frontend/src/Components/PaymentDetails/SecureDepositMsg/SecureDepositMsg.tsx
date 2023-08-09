import { User } from "../../../models/User";
import { useState } from "react";
import LangModel, { LanguageBuyerModal } from "../../../languageControl/Language";
import "./SecureDepositMsg.scss";

interface props {
  user: User | null;
  onSubmit: Function;
  isChecked?: boolean;
  seller?: boolean;
  data: LanguageBuyerModal | LangModel;
  isHebrew:boolean;
}

function SecureDepositMsg(props: props): JSX.Element {
  const data = props.data.SecureDepositMsg;
  const [isChecked, setIsChecked] = useState(false);
  const confirm = (e: any) => {
    if (props.seller) setIsChecked(e.target.checked);
    else props.onSubmit(e.target.checked);
  };

  const nextClick = () => props.onSubmit();

  return (
    <div className={`SecureDepositMsg ${props.isHebrew && 'hebrew'}`}>
      <h5 className="sell-ticket-section-header">
        {data.hey} {props.user?.first_name}, {data.notice}
      </h5>
      <p>{data.paragraph}
      </p>
      <div className="checkbox-container">
        <input
          type="checkbox"
          onChange={confirm}
          checked={props.isChecked ? props.isChecked : isChecked}
        />
        <span>{data.agreeMsg}</span>
      </div>
      {props.seller && (
        <button className="next-btn" onClick={nextClick} disabled={!isChecked}>
      {data.nextBtn}
        </button>
      )}
    </div>
  );
}

export default SecureDepositMsg;
