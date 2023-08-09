import { Category } from "../../models/Category";
import { Event } from "../../models/Event";
import LangModel from "../../languageControl/Language";
import SingleEventCard from "../SingleEventCard/SingleEventCard";
import { UserModes } from "../../store/authSlice";
import { User } from "../../models/User";
import useService from "../../services/userService";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import CurtainsIcon from "@mui/icons-material/Curtains";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import "./UpcomingEvents.scss";

interface props {
  categories: Category[];
  events: Event[];
  data: LangModel;
  mode: UserModes;
  user: User | null;
  favorites: string[];
}

function UpcomingEvents(props: props): JSX.Element {
  const data = props.data.UpcomingEvents;
  const isHebrew = data.viewAll === "ראה הכל";
  const service = useService();

  const addFavorite = (eventID: string) => {
    if (!props.user) return;
    service.addFavoriteEvent(eventID);
  };

  const removeFavorite = (eventID: string) => {
    if (!props.user) return;
    service.removeFavoriteEvent(eventID);
  };

  const icons = {
    standup: <TheaterComedyIcon />,
    sport: <SportsSoccerIcon />,
    theatre: <CurtainsIcon />,
    liveshow: <MusicNoteIcon />,
  };

  return (
    <div className="UpcomingEvents">
      <div className="upper-section">
        <h2 className="upcoming-events-header">{data.header}</h2>
        <div className="categories">
          {props.categories.map((c) => (
            <button className="single-category" key={c._id}>
              <span>
                {(icons as any)[c.name.split(" ").join("").toLowerCase()]}
              </span>
              {isHebrew ? c.hebrew : c.name}
            </button>
          ))}
        </div>
      </div>
      <div className="events-container">
        {props.events.length > 0 &&
          props.events.map((e) => (
            <SingleEventCard
              onRemoveFavorite={removeFavorite}
              onAddFavorite={addFavorite}
              isFavorite={props.favorites.includes(e._id as string)}
              mode={props.mode}
              key={e._id}
              event={e}
              user={props.user}
              upcoming
            />
          ))}
        {!props.events.length && (
          <p className="error-message-section">{data.noEvents}</p>
        )}
      </div>
      <button className={`view-all-btn ${isHebrew && "hebrew"}`}>
        {data.viewAll}
      </button>
    </div>
  );
}

export default UpcomingEvents;
