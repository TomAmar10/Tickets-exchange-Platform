import { User } from "../../../models/User";
import SingleFeedback from "./SingleFeedback";
import "./UserFeedbacks.scss";

interface props {
  user: User;
}

function UserFeedbacks(props: props): JSX.Element {
  return (
    <div className="UserFeedbacks user-page-section">
      <h4 className="section-header">Feedbacks</h4>
      <hr />
      <div className="feedbacks-container">
        {props.user.ratings.map((f) => (
          <SingleFeedback feedback={f} key={f._id} />
        ))}
      </div>
    </div>
  );
}

export default UserFeedbacks;
