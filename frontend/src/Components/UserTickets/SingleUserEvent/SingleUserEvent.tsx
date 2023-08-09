import EventBg from "../../../assets/random-show-bg.jpg";
import dateConvertor from "../../../utils/dateConvertor";
import LangModel from "../../../languageControl/Language";
import { getSign } from "../../../utils/currencyHandler";
import { useState } from "react";
import { EventTicket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import "./SingleUserEvent.scss";

interface props {
  eventTicket: EventTicket;
  data: LangModel;
}

function SingleUserEvent(props: props): JSX.Element {
  const ticketsAmount = props.eventTicket.ticketsArray
    ? props.eventTicket.ticketsArray.length
    : 0;
  const data = props.data.SingleUserEvent;
  const tickets = props.eventTicket.ticketsArray;
  const [isCurrent, setIsCurrent] = useState(false);
  const ticketStr = `${
    ticketsAmount > 1 ? ` ${ticketsAmount} ${data.tickets}` : data.ticket
  }`;

  const showTickets = () => {
    setIsCurrent((prev) => !prev);
  };

  return (
    <div className="user-event-container">
      <div className="Single-user-event">
        <div className="event-details">
          <div>
            <h5 className="event-name">
              {(props.eventTicket.id_event as Event).event_name}
            </h5>
            <span className="date">
              {dateConvertor(
                (props.eventTicket.id_event as Event).date as string
              )}
            </span>
          </div>
          <span className="location">
            {(props.eventTicket.id_event as Event).location}
          </span>
          <button className="show-tickets" onClick={showTickets}>
            {isCurrent ? data.hide : `${data.click}${ticketStr}`}
          </button>
        </div>
        <img
          src={(props.eventTicket.id_event as Event).image || EventBg}
          className="event-img"
          alt={(props.eventTicket.id_event as Event).event_name}
        />
      </div>
      {isCurrent && (
        <>
          <hr />
          <div className="event-tickets">
            {tickets.map((t) => (
              <div key={t._id} className="single-ticket">
                <div>
                  Area: <span>{t.area}</span>
                </div>
                <div>
                  Seat: <span>{t.seat as string} </span>
                </div>
                <div>
                  Row: <span>{t.row}</span>
                </div>
                <div>
                  Price:
                  <span>
                    {t.price as number}
                    {getSign(t.currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default SingleUserEvent;
