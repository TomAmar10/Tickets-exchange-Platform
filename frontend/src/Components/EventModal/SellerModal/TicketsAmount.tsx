import { useState } from "react";
import { Event } from "../../../models/Event";
import { useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import { UserModes } from "../../../store/authSlice";
import { LanguageEventModal } from "../../../languageControl/Language";
import "./TicketsAmount.scss";
import dateConvertor from "../../../utils/dateConvertor";

interface props {
  onSubmit: Function;
  event: Event | null;
  amount?: number;
  header?: string;
  maxToSell?: number;
  data: LanguageEventModal;
}

function TicketsAmount(props: props): JSX.Element {
  const data = props.data.TicketsAmount;
  const options = [1, 2, 3, 4, 5, 6];
  const [currentAmount, setCurrentAmount] = useState(props.amount);
  const userMode = useSelector((state: IStore) => state.user.mode);
  const isBuyer = userMode === UserModes.BUYER;
  const buyOrSell = userMode === UserModes.BUYER ? "buy" : "sell";

  const amountClick = (value: number) => {
    setCurrentAmount(value);
    props.onSubmit(value);
  };

  return (
    <div className="TicketsAmount">
      <div className="current-event-details">
        <div className="event-details">
          <h6 className="event-name">{props.event?.event_name}</h6>
          <span>{dateConvertor(props.event?.date as string)}</span>
          <span>{props.event?.location}</span>
        </div>
        <img
          className="current-event-image"
          src={props.event?.image}
          alt={props.event?.event_name}
        />
      </div>
      <h5 className="ticket-section-header">
        {isBuyer ? data.howManyBuy : data.howManySell}
      </h5>
      <div className="amount-options-area">
        {options.map((o) => (
          <button
            key={o}
            className={`tickets-amount-option ${
              currentAmount === o && "current-amount"
            }`}
            value={o}
            onClick={(e: any) => amountClick(+e.target.value)}
            disabled={(props.maxToSell || 6) < o}
          >
            {o}
          </button>
        ))}
      </div>
      {(props.maxToSell || 6) < 6 && (
        <span className="max-tickets-msg">
          {data.maxMsg1} {6 - (props.maxToSell || 6)} {data.maxMsg2}
        </span>
      )}
    </div>
  );
}

export default TicketsAmount;
