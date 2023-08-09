import { User } from "../../../models/User";
import UserImage from "../../../assets/random-profile.png";
import { Rating } from "@mui/material";
import dateConvertor from "../../../utils/dateConvertor";
import { Feedback } from "../../../models/Feedback";
import "./SingleFeedback.scss";

interface props {
  feedback: Feedback;
  // data:any;
}

function SingleFeedback(props: props): JSX.Element {
    // const data = props.data;
  const rater = props.feedback.id_posted as User;
  const raterName = rater.first_name || "Deleted user";
  return (
    <div className="SingleFeedback">
      <div className="left-side">
        <div className="rating-user">
          <img
            src={rater.image || UserImage}
            alt={rater.first_name}
            className="image"
          />
          <div className="details">
            <h6 className="user-name">{raterName}</h6>
            <span className="time-create">
              {dateConvertor(props.feedback.time_create as string)}
            </span>
          </div>
        </div>
        <p className="comment">{props.feedback.comment}</p>
      </div>
      <div className="right-side">
        {/* <span className="rate-span">{data.rated}</span> */}
        <Rating value={+props.feedback.star} readOnly precision={0.5} />
      </div>
    </div>
  );
}

export default SingleFeedback;
