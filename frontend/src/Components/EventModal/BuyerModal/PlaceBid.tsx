import { useEffect, useState } from "react";
import { User } from "../../../models/User";
import { Event } from "../../../models/Event";
import { SellerTicket } from "./SellersSlider";
import { Ticket } from "../../../models/Ticket";
import { getSign } from "../../../utils/currencyHandler";
import "./PlaceBid.scss";
import { LanguageBuyerModal } from "../../../languageControl/Language";

interface props {
  onSubmit: Function;
  user: User | null;
  event: Event | null;
  currentSeller: SellerTicket | null;
  data: LanguageBuyerModal;
}

function PlaceBid(props: props): JSX.Element {
  const data = props.data.PlaceBid;
  const [selectedTickets, setSelectedTickets] = useState<Ticket[]>([]);
  // const [currentBid, setCurrentBid] = useState<number>(0);

  useEffect(() => {
    setSelectedTickets([]);
    // setCurrentBid(0);
  }, []);

  const toggleTicket = (ticket: Ticket) => {
    const index = selectedTickets.findIndex((s) => s._id === ticket._id);
    const newTickets = [...selectedTickets];
    index === -1 ? newTickets.push(ticket) : newTickets.splice(index, 1);
    newTickets.sort((a, b) => (a.seat as number) - (b.seat as number));
    setSelectedTickets(newTickets);
    // props.onSubmit(currentBid, newTickets);
    props.onSubmit(newTickets);
  };

  // const changeBid = (value: number) => {
  //   setCurrentBid(value);
  //   props.onSubmit(value, selectedTickets);
  // };

  return (
    <div className="PlaceBid">
      <h5 className="buy-ticket-section-header">{data.header}</h5>
      <div className="all-tickets">
        {props.currentSeller?.ticketsArray.map((t) => (
          <label
            className={`single-ticket-label ${
              selectedTickets.includes(t) ? "selected" : ""
            }`}
            key={t._id}
          >
            <input
              type="checkbox"
              className="ticket-checkbox"
              onChange={() => toggleTicket(t)}
              checked={selectedTickets.includes(t)}
            />
            <div className="single-ticket">
              <div className="single-ticket-headers">
                <h6>{data.seat}</h6>
                <h6>{data.row}</h6>
                <h6>{data.area}</h6>
              </div>
              <div className="single-ticket-details">
                <span>{t.seat as string}</span>
                <span>{t.row}</span>
                <span>{t.area}</span>
              </div>
            </div>
          </label>
        ))}
      </div>
      <h5 className="total-price">
        {data.total}
        <span>
          {+(props.currentSeller?.price as Number) * selectedTickets.length ||
            0}
          {getSign(props.currentSeller?.currency as string) || "$"}
        </span>
      </h5>
      {/* <div className="bid-area">
          <h5 className="buy-ticket-section-header">Price per ticket</h5>
          <input
            type="number"
            className="bid-amount-input"
            onChange={(e) => changeBid(+e.target.value)}
            value={currentBid || ""}
          />
          <span className="price-calculate">
            {currentBid} X {selectedTickets.length}
          </span>
          <h5 className="current-bid">
            Your bid : {currentBid * selectedTickets.length}{" "}
            {getSign(props.currentSeller?.currency as string) || "$"}
          </h5>
        </div> */}
    </div>
  );
}

export default PlaceBid;
