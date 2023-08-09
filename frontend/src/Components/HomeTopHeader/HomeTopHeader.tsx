import { useEffect, useState } from "react";
import { Event } from "../../models/Event";
import useDebounce from "../../utils/useDebounce";
import { topHeaderImage } from "../../utils/file-import";
import { useDispatch } from "react-redux";
import { eventActions } from "../../store/eventSlice";
import TopNavbar from "../TopNavbar/TopNavbar";
import LangModel from "../../languageControl/Language";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./HomeTopHeader.scss";
import DatePicker from "./DatePicker";

interface props {
  events: Event[] | null;
  data: LangModel;
}

function HomeTopHeader(props: props): JSX.Element {
  const data = props.data.HomeTopHeader;
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [currentEvents, setCurrentEvents] = useState<Event[] | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 300);
  const dispatch = useDispatch();

  const [datesRange, setDatesRange] = useState<any>([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    async function search() {
      const newEventsList = props.events?.filter(
        (e) =>
          e.event_name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          e.location.toLowerCase().includes(searchValue.toLowerCase())
      );
      setCurrentEvents(newEventsList || null);
    }
    if (debouncedSearch) search();
    else setCurrentEvents(null);
  }, [debouncedSearch, props.events, searchValue]);

  const clickEvent = (event: Event) => {
    setTimeout(() => {
      dispatch(eventActions.setSingleEvent(event));
    }, 100);
  };

  const onInputBlur = () => {
    setTimeout(() => {
      setIsFocus(false);
    }, 100);
  };

  const createEvent = () => {
    setTimeout(() => {
      dispatch(eventActions.startCreating());
    }, 100);
  };

  const changeDates = (dates: any) => setDatesRange(dates);

  return (
    <div className="HomeTopHeader">
      <TopNavbar />
      <div className="top-main-area">
        <div className="application-header">
          <h1>{data.header}</h1>
          <p>{data.paragraph}</p>
          <div className="buttons">
            <button className="header-btn">Trade Now</button>
            <button className="header-btn">Learn More</button>
          </div>
        </div>
        <div className="top-image-container">
          <img src={topHeaderImage} alt="Hotix" className="top-image" />
        </div>
      </div>
      <div className="inputs-container">
        <div className="search-section">
          <input
            className="search-input"
            onFocus={() => setIsFocus(true)}
            onBlur={onInputBlur}
            onChange={(e) => setSearchValue(e.target.value)}
            type="text"
            placeholder={data.searchPlaceholder}
          />
          <div className="separator"></div>
          <DatePicker onDatesChange={changeDates} datesRange={datesRange} />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        {currentEvents && isFocus && (
          <div className="dropdown">
            {currentEvents.length < 1 && <span>{data.noEvents}</span>}
            {currentEvents.map((e) => (
              <div
                className="single-result"
                key={e._id}
                onClick={() => clickEvent(e)}
              >
                {e.id_category.name && (
                  <img
                    className="result-image"
                    src={e.image}
                    alt={e.event_name}
                  />
                )}
                <div>
                  <h6 className="result-name">{e.event_name}</h6>
                  <span className="result-description">{e.description}</span>
                </div>
              </div>
            ))}
            <button className="see-all-results-btn">{data.seeAll}</button>
            <button className="create-new-event" onClick={createEvent}>
              {data.createEvent}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeTopHeader;
