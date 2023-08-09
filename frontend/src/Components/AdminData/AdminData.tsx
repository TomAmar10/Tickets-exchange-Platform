import { useState } from "react";
import { User } from "../../models/User";
import { Category } from "../../models/Category";
import { Event } from "../../models/Event";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventNoteIcon from "@mui/icons-material/EventNote";
import UserPopup from "../UserPopup/UserPopup";
import Rating from "@mui/material/Rating";
import { useDispatch } from "react-redux";
import { eventActions } from "../../store/eventSlice";
import LangModel from "../../languageControl/Language";
import "./AdminData.scss";

interface props {
  user: User | null;
  data: LangModel;
  users: User[];
  events: Event[];
}

function AdminData(props: props): JSX.Element {
  const data = props.data.AdminData;
  const [userToWatch, setUserToWatch] = useState<User | null>(null);
  const dispatch = useDispatch();

  const hidePopup = () => setUserToWatch(null);
  const chooseEvent = (e: Event) => dispatch(eventActions.setSingleEvent(e));

  return (
    <>
      <div className="AdminData">
        <h1 className="admin-header">
          {data.header} {props.user?.first_name} {props.user?.last_name}!
        </h1>
        <div className="table-container">
          <h4 className="table-header">{data.userList}</h4>
          <table>
            <thead>
              <tr>
                <th>{data.firstName}</th>
                <th>{data.lastName}</th>
                <th>{data.phone}</th>
                <th>{data.email}</th>
                <th>{data.rating}</th>
              </tr>
            </thead>
            <tbody>
              {props.users.map((u) => (
                <tr
                  key={u._id}
                  className="single-user"
                  onClick={() => setUserToWatch(u)}
                >
                  <td>{u.first_name}</td>
                  <td>{u.last_name}</td>
                  <td>{u.phone}</td>
                  <td>{u.email}</td>
                  <td>
                    {" "}
                    <Rating
                      value={+u.total_rating}
                      readOnly
                      size="medium"
                      precision={0.5}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-container">
          <h4 className="table-header">{data.eventList}</h4>
          <table>
            <thead>
              <tr>
                <th>{data.eventName}</th>
                <th>{data.date}</th>
                <th>{data.category}</th>
                <th>{data.location}</th>
                <th>{data.status}</th>
              </tr>
            </thead>
            <tbody>
              {props.events.map((e) => (
                <tr
                  key={e._id}
                  className="single-event"
                  onClick={() => chooseEvent(e)}
                >
                  <td>{e.event_name}</td>
                  <td>{e.date as string}</td>
                  <td>{(e.id_category as Category).name}</td>
                  <td>{e.location}</td>
                  <td>
                    {e.isApproved ? (
                      <div className="approved">
                        <EventAvailableIcon className="approved-icon" />
                        <span>{data.approved}</span>
                      </div>
                    ) : (
                      <div className="waiting">
                        <EventNoteIcon className="waiting-icon" />
                        <span>{data.waiting}</span>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {userToWatch && <UserPopup user={userToWatch} onHidePopup={hidePopup} />}
    </>
  );
}

export default AdminData;
