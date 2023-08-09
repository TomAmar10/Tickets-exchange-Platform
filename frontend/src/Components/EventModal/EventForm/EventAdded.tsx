import { Event } from "../../../models/Event";
import { Role, User } from "../../../models/User";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import "./EventAdded.scss";
import { useDispatch } from "react-redux";
import { eventActions } from "../../../store/eventSlice";

interface props {
  user: User | null;
  event: Event | null;
}

function EventAdded(props: props): JSX.Element {
  const dispatch = useDispatch();

  const done = () => dispatch(eventActions.clearSingleEvent())

  return (
    <div className="EventAdded">
      <h2 className="thank-header">Thank you, {props.user?.first_name} !</h2>
      <EventAvailableIcon className="event-confirm" />
      {props.user?.role === Role.ADMIN ? (
        <>
          <h5 className="success-msg">
            You have approved the event successfully
          </h5>
          <p className="success-paragraph">
            The event
            <span>{props.event?.event_name}</span>
            is now available for users to sell & buy.
          </p>
        </>
      ) : (
        <>
          <h5 className="success-msg">
            Your event Was created successfully
          </h5>
          <p className="success-paragraph">
            We will have a look at it, and in the next 24 hours - <br />
            We'll let you know if the event is approved, with a message to this
            mail - {props.user?.email}
          </p>
        </>
      )}
      <button className="ok-btn" onClick={done}>OK</button>
    </div>
  );
}

export default EventAdded;
