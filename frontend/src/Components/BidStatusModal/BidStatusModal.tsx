import LangModel from "../../languageControl/Language";
import { Bid, StatusBid } from "../../models/Bid";
import { Event } from "../../models/Event";
import { Ticket } from "../../models/Ticket";
import { User } from "../../models/User";
import dateConvertor from "../../utils/dateConvertor";
import { SellerTicket } from "../EventModal/BuyerModal/SellersSlider";
import "./BidStatusModal.scss";

interface props {
  bid: Bid;
  user: User | null;
  clearModal: Function;
  data: LangModel;
}

function BidStatusModal(props: props): JSX.Element {
  const data = props.data.BidStatusModal;
  const event = (props.bid.tickets[0] as Ticket).id_event as Event;
  const eventDate = dateConvertor(event.date as string);
  const isConfirmed = props.bid.status === StatusBid.CONFIRMED;
  const currentStep = isConfirmed ? 2 : 1;
  const price =
    props.bid.amount *
    ((props.bid.tickets as SellerTicket[])[0].ticketsArray as Ticket[]).length;

  const sellerSteps = {
    step1: `An offer was sent by you to ${
      (props.bid.id_owner as User).first_name
    } ${(props.bid.id_owner as User).last_name}`,
    step2: `${(props.bid.id_owner as User).first_name} ${
      (props.bid.id_owner as User).last_name
    } has confirmed your offer`,
    step3: `Tickets are in your 'tickets - upcoming events' section`,
    step4: `${eventDate} - SHOW TIME`,
  };

  console.log(props.bid);

  return (
    <div className="BidStatusModal">
      <h5 className="status-header">{data.header}</h5>
      <div className="bid-ticket">
        <div className="bid-ticket-section">
          <h6 className="event-name">{event.event_name}</h6>
          <span>{eventDate}</span>
          <span>{event.location}</span>
        </div>
        <div className="bid-ticket-section">
          <div>
            <span className="bid-price">{data.bidPrice}:</span>
            <span className="price">{price} $</span>
          </div>
          <div className="seat-details">
            <section className="seat-section">
              <span className="detail-header">{data.seat}</span>
              {(props.bid.tickets[0] as Ticket).seat as string}
            </section>
            |
            <section className="seat-section">
              <span className="detail-header">{data.row}</span>
              {(props.bid.tickets[0] as Ticket).row}
            </section>
            |
            <section className="seat-section">
              <span className="detail-header">{data.area}</span>
              {(props.bid.tickets[0] as Ticket).area}
            </section>
          </div>
        </div>
      </div>
      <div className="dots-line-through"></div>
      <div className="steps-container">
        {Object.values(sellerSteps).map((s, i) => (
          <div className="single-step" key={s}>
            <span
              className={`step-dot ${currentStep > i ? "done" : ""}`}
            ></span>
            <span className="step-description">{s}</span>
          </div>
        ))}
      </div>
      <div className="ok-button-holder">
        <button className="ok-button" onClick={() => props.clearModal()}>
          {data.closeBtn}
        </button>
      </div>
    </div>
  );
}

export default BidStatusModal;
