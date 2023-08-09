import { User } from "../../../models/User";
import { Ticket } from "../../../models/Ticket";
import { Event } from "../../../models/Event";
import { Bid } from "../../../models/Bid";
import { SellerTicket } from "../../EventModal/BuyerModal/SellersSlider";
import "./CongratsMsg.scss";

interface props {
  user: User | null;
  bid: Bid;
}

function CongratsMsg(props: props): JSX.Element {
  const bidder = props.bid.id_bidder as User;
  const owner = props.bid.id_owner as User;
  const event = (props.bid.tickets[0] as Ticket).id_event as Event;
  return (
    <div className="CongratsMsg">
      <h5 className="congrats-header">Congratulations!</h5>
      {props.user?._id === bidder._id && (
        <>
          <p className="congrats-paragraph">
            Dear {props.user?.first_name}, <br />
            We are delighted to inform you that the transfer of your new ticket
            to
            <span className="show-name">{event.event_name}</span>
            has been completed successfully!
          </p>
          <p className="congrats-paragraph">
            You can find more details about your ticket in the "Tickets" section
            of your account. <br />
            Please note that you will receive the actual ticket within 24 hours
            before the show, to ensure ticket's security.
            <br />
            We hope you enjoy the show and have a wonderful time.
            <span className="thanks-hotix">
              Thank you for choosing <span className="hotix-brand">Hotix</span>
            </span>
          </p>
        </>
      )}
      {props.user?._id === owner._id && (
        <>
          <p className="congrats-paragraph">
            Dear {props.user?.first_name}, <br />
            We are delighted to inform you that the transfer of your ticket
            {(props.bid.tickets[0] as SellerTicket).ticketsArray.length > 1 &&
              "s"}{" "}
            to
            <span className="show-name">
              {((props.bid.tickets[0] as Ticket).id_event as Event).event_name}
            </span>
            is now in progress, and we are waiting for
            {` ${bidder.first_name} ${bidder.last_name} `}
            to make the payment.
          </p>
          <p className="congrats-paragraph">
            We will notify you as soon as the payment is received and the
            transfer is successfully completed.
            <span className="thanks-hotix">
              Thank you for choosing <span className="hotix-brand">Hotix</span>
            </span>
          </p>
        </>
      )}
    </div>
  );
}

export default CongratsMsg;
