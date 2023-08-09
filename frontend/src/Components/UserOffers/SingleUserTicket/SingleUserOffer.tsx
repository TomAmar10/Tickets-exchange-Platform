import { Ticket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import dateConvertor from "../../../utils/dateConvertor";
import { SellerTicket } from "../../EventModal/BuyerModal/SellersSlider";
import { randomProfile } from "../../../utils/file-import";
import { Rating } from "@mui/material";
import { Bid, StatusBid } from "../../../models/Bid";
import { getSign } from "../../../utils/currencyHandler";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import "./SingleUserOffer.scss";

interface props {
  bid: Bid;
  user: User | null;
  onAccept?: Function;
  onDecline?: Function;
  onCancelBid?: Function;
  onViewStatus?: Function;
  onNewBid?: Function;
}

function SingleUserOffer(props: props): JSX.Element {
  const bidder = props.bid.id_bidder as User;
  const owner = props.bid.id_owner as User;
  const userToShow = props.user?._id === bidder._id ? owner : bidder;
  const isMyBid = bidder._id === props.user?._id;
  const event = (props.bid.tickets[0] as Ticket).id_event as Event;
  const ticketsArray = (props.bid.tickets as SellerTicket[])[0]
    .ticketsArray as Ticket[];
  const price = ticketsArray.length * props.bid.amount;
  const [isNewBid, setIsNewBid] = useState(false);
  const [newBidPrice, setNewBidPrice] = useState(0);

  const acceptOffer = () => props.onAccept && props.onAccept(props.bid);
  const viewStatus = () => props.onViewStatus && props.onViewStatus(props.bid);
  const declineBid = () => props.onDecline && props.onDecline(props.bid);
  const cancelMyBid = () => props.onCancelBid && props.onCancelBid(props.bid);

  const submitNewBid = () => {
    props.onNewBid && props.onNewBid(props.bid, newBidPrice);
    setIsNewBid(false);
  };

  const onBidPriceChange = (price: number) => {
    if (price > 99999) return;
    setNewBidPrice(price);
  };

  return (
    <div className="SingleUserOffer">
      <div className="user-details">
        <img
          src={(userToShow.image as string) || randomProfile}
          alt="user"
          className="user-profile-image"
        />
        <div className="name-and-rating">
          <h5 className="user-name">{`${userToShow.first_name} ${userToShow.last_name}`}</h5>
          <Rating value={+userToShow.total_rating} readOnly precision={0.5} />
        </div>
      </div>
      <hr />
      <div className="event-details">
        <h5 className="event-name">{event.event_name}</h5>
        <span className="event-date">
          {dateConvertor(event.date as string)}
        </span>
      </div>
      <div className="ticket-details">
        <div className="ticket-headers">
          <h6>Seat{ticketsArray.length > 1 && "s"}</h6>
          <h6>Row</h6>
          <h6>Price</h6>
        </div>
        <div className="ticket-info">
          <span>{(props.bid.tickets as Ticket[])[0].seat as string}</span>
          <span>{(props.bid.tickets as Ticket[])[0].row}</span>
          <span>
            {price}
            {getSign((props.bid.tickets as Ticket[])[0].currency)}
          </span>
        </div>
      </div>
      <div className="actions-area">
        {props.bid.status === StatusBid.PENDING &&
          (isMyBid ? (
            <>
              <button className="cancel-offer-btn" onClick={cancelMyBid}>
                Cancel offer
              </button>
              <button className="view-status-btn" onClick={viewStatus}>
                View Status
              </button>
            </>
          ) : (
            <div className="reply-area">
              <button className="reply-btn accept" onClick={acceptOffer}>
                Accept
              </button>
              <button className="reply-btn decline" onClick={declineBid}>
                Decline
              </button>
            </div>
          ))}
        {props.bid.status === StatusBid.DECLINED && (
          <div className="new-bid-area">
            {isNewBid ? (
              <>
                <input
                  onChange={(e) => onBidPriceChange(+e.target.value)}
                  type="number"
                  className="new-bid-input form-control"
                  placeholder="Enter new bid price"
                />
                <div className="new-bid-buttons">
                  <button className="submit-new-bid-btn" onClick={submitNewBid}>
                    Bid {getSign((props.bid.tickets as Ticket[])[0].currency)}
                    {newBidPrice}
                  </button>
                  <button
                    className="cancel-new-bid-btn"
                    onClick={() => setIsNewBid(false)}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <button
                className="place-new-bid-btn"
                onClick={() => setIsNewBid(true)}
              >
                <EditIcon />
                Place New Bid
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SingleUserOffer;
