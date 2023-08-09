import { NavLink } from "react-router-dom";
import { Event } from "../../../models/Event";
import { UserModes } from "../../../store/authSlice";
import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import { Ticket } from "../../../models/Ticket";
import { Bid } from "../../../models/Bid";
import randomShowImg from "../../../assets/random-show-bg.jpg";
import { LanguageEventModal } from "../../../languageControl/Language";
import "./EventPreview.scss";
import dateConvertor from "../../../utils/dateConvertor";

interface props {
  onMoveToSecondStep: Function;
  userMode: UserModes | null;
  user: User | null;
  event: Event | null;
  userTicketsForSale: Ticket[] | [];
  userConfirmedBids: Bid[] | [];
  data: LanguageEventModal;
  isHebrew?: boolean;
}

function EventPreview(props: props): JSX.Element {
  const data = props.data.EventPreview;
  const [isPermitted, setIsPermitted] = useState(false);
  const category = props.event?.id_category;
  const [error, setError] = useState("");

  useEffect(() => {
    if (props.userMode === UserModes.BUYER) {
      setIsPermitted(true);
      return;
    }
    if (props.userTicketsForSale?.length + props.userConfirmedBids.length > 5) {
      setIsPermitted(false);
      setError(data.maxError);
    } else setIsPermitted(true);
  }, [data.maxError, props]);

  return (
    <div className="EventPreview">
      <img
        src={props.event?.image || randomShowImg}
        alt={props.event?.event_name}
      />
      <div className="event-data">
        <h5>{props.event?.event_name}</h5>
        <div className="data-row">
          <h6>{data.about}:</h6> {props.event?.description}
        </div>
        <div className="data-row">
          <h6>{data.category}:</h6>{" "}
          {props.isHebrew ? category?.hebrew : category?.name}
        </div>
        <div className="data-row">
          <h6>{data.location}:</h6> {props.event?.location}
        </div>
        <div className="data-row">
          <h6>{data.date}:</h6> {dateConvertor(props.event?.date as string)}
        </div>
        <hr />
      </div>
      {error && <span className="user-error">{error}</span>}
      <div className="event-preview-buttons">
        <NavLink to={`/event/${props.event?._id}`}>
          <button className="event-details-btn">{data.detailsBtn}</button>
        </NavLink>
        {props.user ? (
          <button
            disabled={!isPermitted}
            className="buy-now-btn"
            onClick={() => props.onMoveToSecondStep()}
          >
            {props.userMode === UserModes.BUYER ? data.buyBtn : data.sellBtn}
          </button>
        ) : (
          <NavLink to={"/auth/login"}>
            <button className="buy-now-btn">{data.loginBtn}</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default EventPreview;
