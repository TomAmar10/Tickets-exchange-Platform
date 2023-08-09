import { useDispatch } from "react-redux";
import { Event } from "../../models/Event";
import { eventActions } from "../../store/eventSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { UserModes } from "../../store/authSlice";
import { shortDate } from "../../utils/dateConvertor";
import { User } from "../../models/User";
import "./SingleEventCard.scss";

interface props {
  event: Event;
  mode: UserModes;
  upcoming?: boolean;
  user: User | null;
  onAddFavorite: Function;
  onRemoveFavorite: Function;
  isFavorite: boolean;
}

function SingleEventCard(props: props): JSX.Element {
  const dispatch = useDispatch();
  const eventDate = shortDate(props.event.date as string);

  const chooseEvent = () => {
    dispatch(eventActions.setSingleEvent(props.event));
  };
  const buttonText =
    props.mode === UserModes.BUYER ? "Get Ticket" : "Sell Ticket";

  const favoriteClick = () => {
    if (props.onAddFavorite && props.onRemoveFavorite) {
      props.isFavorite
        ? props.onRemoveFavorite(props.event._id)
        : props.onAddFavorite(props.event._id);
    }
  };

  return (
    <div className="SingleEventCard-container">
      <div className={`SingleEventCard ${props.upcoming && "upcoming"}`}>
        <div className="event-card-img-holder">
          <img
            className="event-card-img"
            src={props.event.image}
            alt={props.event.event_name}
          />
        </div>
        <div className="event-card-content">
          <div className="top-section">
            <div className="about-event">
              <h4 className="event-name">{props.event.event_name}</h4>
              <p className="description">{props.event.description}</p>
            </div>
            <div className="icons-area">
              {props.isFavorite ? (
                <FavoriteIcon
                  className="favorite-btn favorite"
                  onClick={favoriteClick}
                />
              ) : (
                <FavoriteBorderIcon
                  onClick={favoriteClick}
                  className="favorite-btn"
                />
              )}
              <ShareIcon className="share-btn" />
            </div>
          </div>
          <hr />
          <div className="bottom-section">
            <div className="date">
              <CalendarMonthIcon />
              <span>{eventDate}</span>
            </div>
            <div className="location">
              <LocationOnIcon />
              <span>Israel</span>
            </div>
            <button className="get-ticket-btn" onClick={chooseEvent}>
              {buttonText}
            </button>
          </div>
        </div>
      </div>
      <div className="hashtags">
        <button className="single-hashtag">Musical</button>
        <button className="single-hashtag">Israel</button>
        <button className="single-hashtag">Noa Kirel</button>
      </div>
    </div>
  );
}

export default SingleEventCard;
