import { Category } from "../../models/Category";
import LangModel from "../../languageControl/Language";
import { Event } from "../../models/Event";
import SingleEventCard from "../SingleEventCard/SingleEventCard";
import { UserModes } from "../../store/authSlice";
import { User } from "../../models/User";
import Slider from "react-slick";
import useUserService from "../../services/userService";
import "./slick.scss";
import "./slick-theme.scss";
import "./PopularEvents.scss";

interface props {
  categories: Category[];
  language: string;
  data: LangModel;
  events: Event[];
  favorites: string[];
  mode: UserModes;
  user: User | null;
}

function PopularEvents(props: props): JSX.Element {
  const data = props.data.PopularEvents;
  const userService = useUserService();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2000,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1450,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const addFavorite = (eventID: string) => {
    if (!props.user) return;
    userService.addFavoriteEvent(eventID);
  };

  const removeFavorite = (eventID: string) => {
    if (!props.user) return;
    userService.removeFavoriteEvent(eventID);
  };

  return (
    <div className="PopularEvents">
      <h1 className="popular-events-header">{data.header}</h1>
      <div className="events-container">
        <Slider {...settings}>
          {props.events.length > 0 &&
            props.events
              .slice(0, 4)
              .map((e) => (
                <SingleEventCard
                  onAddFavorite={addFavorite}
                  onRemoveFavorite={removeFavorite}
                  isFavorite={props.favorites.includes(e._id as string)}
                  key={e._id}
                  event={e}
                  mode={props.mode}
                  user={props.user}
                />
              ))}
        </Slider>
      </div>
    </div>
  );
}

export default PopularEvents;
