import { User } from "../../models/User";
import { randomProfile } from "../../utils/file-import";
import Rating from "@mui/material/Rating";
import "./UserPopup.scss";
import { Feedback } from "../../models/Feedback";
import dateConvertor from "../../utils/dateConvertor";

interface props {
  user: User | null;
  onHidePopup: Function;
}

function UserPopup(props: props): JSX.Element {
  const hidePopup = () => props.onHidePopup();
  const value = +(props.user?.total_rating || 0);
  return (
    <>
      <div className="UserPopup">
        <div className="top">
          <img src={props.user?.image || randomProfile} alt="user" />
          <div className="name-and-rating">
            <h3 className="user-name">
              {props.user?.first_name} {props.user?.last_name}
            </h3>
            <Rating value={value} readOnly size="large" precision={0.5} />
          </div>
        </div>
        {props.user?.ratings && props.user?.ratings.length > 0 ?
        <div className="feedbacks">
          <h5 className="header">Feedbacks</h5>
          <div className="feedback-list">
            {props.user?.ratings.map((r: Feedback) => (
              <div className="single-feedback">
                <div className="feedback-top">
                  <img
                    src={(r.id_posted as User).image || randomProfile}
                    className="rating-user-img"
                    alt="rate"
                  />
                  <div className="rating-user-details">
                    <h6 className="rating-user-name">
                      {(r.id_posted as User).first_name}{" "}
                      {(r.id_posted as User).last_name}
                    </h6>
                    <span className="publish-date">
                      {dateConvertor(r.time_create as string)}
                    </span>
                  </div>
                </div>
                <p className="comment">{r.comment} dddddddddsjf hsdjkkfshdfjsdf dddddddddsjf hsdjkkfshdfjsdfdddddddddsjf hsdjkkfshdfjsdfdddddddddsjf hsdjkkfshdfjsdfdddddddddsjf hsdjkkfshdfjsdfdddddddddsjf hsdjkkfshdfjsdf</p>
                <span className="stars">
                  {(r.id_posted as User).first_name} rated{" "}
                  {props.user?.first_name} with{" "}
                  <Rating
                    value={+r.star}
                    readOnly
                    size="small"
                    precision={0.5}
                    />
                </span>
              </div>
            ))}
          </div>
        </div>
        :
        <p className="no-feedback-msg">{props.user?.first_name} has no feedbacks yet.</p>
        }
      </div>
      <div className="popup-holder" onClick={hidePopup}></div>
    </>
  );
}

export default UserPopup;
