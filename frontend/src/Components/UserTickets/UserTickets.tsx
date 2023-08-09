import { UserEventTickets } from "../../store/userTicketsSlice";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import format from "date-fns/format";
import "./UserTickets.scss";

interface props {
  userEventTickets: UserEventTickets[];
}

function UserTickets(props: props): JSX.Element {

  return (
    <div className="UserTickets user-page-section">
      <h4 className="section-header">Tickets</h4>
      <hr />
      <div className="events-tickets-container">
        {props.userEventTickets.map((e) => (
          <div className="EventTicketsCard" key={`${e._id}-event`}>
            <img src={e.image} className="event-image" alt={e._id} />
            <div className="event-details">
              <h5 className="event-name">{e.event_name}</h5>
              <div className="event-date">
                <CalendarMonthIcon className="details-icon" />
                <p>
                  <span>Event Date</span> :{" "}
                  {format(new Date(e.date), "dd MMM, p")}
                </p>
              </div>
              <div className="event-location">
                <LocationOnIcon className="details-icon" />
                <p>
                  <span>Event Location</span> : {e.location}
                </p>
              </div>
              <p className="event-description">{e.description}</p>
            </div>
            <div className="tickets-section">
              <button className="view-tickets-btn">View Tickets</button>
              <span>{e.ticketsArray.length} Tickets Available</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserTickets;
