import Rating from "@mui/material/Rating";
import { User } from "../../../models/User";
import { SellerTicket } from "./SellersSlider";
import { randomProfile } from "../../../utils/file-import";
import "./SingleSellerCard.scss";
import { LanguageSellersSlider } from "../../../languageControl/Language";
import { Link } from "react-router-dom";

interface props {
  ticket: SellerTicket;
  onClick?: Function;
  isActive?: boolean;
  data: LanguageSellersSlider;
}

function SingleSellerCard(props: props): JSX.Element {
  const data = props.data.SingleSellerCard;
  const user = props.ticket?.id_owner as User;
  const value = +user.total_rating;
  return (
    <div className="single-seller-container">
      <div className="SingleSellerCard">
        <Link className="user-details" to={`/profile/${user._id}`}>
          <img
            src={(user.image as string) || randomProfile}
            alt="user"
            className="user-profile-image"
          />
          <div className="name-and-rating">
            <h5 className="user-name">
              {`${user.first_name} ${user.last_name}`}
            </h5>
            <Rating value={value} readOnly precision={0.5} />
            <span className="ratings-amount">
              {user.ratings.length} {data.rated}
            </span>
          </div>
        </Link>
        <div className="ticket-details">
          <div className="ticket-headers">
            <h6>{data.seats}</h6> <span></span> <h6>{data.row}</h6>
          </div>
          <div className="ticket-info">
            <span>{props.ticket.seat as string}</span>
            <span>{props.ticket.row}</span>
          </div>
        </div>
        <div className="show-tickets-area">
          <button
            className={`show-tickets-button ${
              props.isActive ? "active-seller" : ""
            }`}
            onClick={() => props.onClick && props.onClick()}
          >
            <span className="amount">{props.ticket.ticketsArray.length}</span>{" "}
            {data.tickets}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleSellerCard;
