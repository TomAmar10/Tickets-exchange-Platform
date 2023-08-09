import { Rating } from "@mui/material";
import { User } from "../../../models/User";
import { useState } from "react";
import { Deal } from "../../../models/Deal";
import service from "../../../services/userService";
import "./Feedback.scss";
import useService from "../../../services/userService";

interface props {
  dealToRate: Deal | null;
  userToRate: User;
  user: User | null;
  onClose: Function;
}

function Feedback(props: props): JSX.Element {
  const service = useService();
  const [value, setValue] = useState<number | null>(
    +props.userToRate.total_rating
  );
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isRated, setIsRated] = useState(false);

  const sendRating = () => {
    if (!isRated) {
      setError(
        `please rate ${props.userToRate.first_name} ${props.userToRate.last_name}`
      );
      return;
    }
    const commentLength = comment.split(" ").length;
    if (commentLength < 5) {
      setError("Please write your feedback with at least 5 words");
      return;
    }
    const rating = {
      star: value,
      comment: comment,
      id_deal: props.dealToRate?._id,
      id_posted: props.user?._id,
      is_seller: false,
    };
    service.addRating(props.userToRate._id as string, rating);
  };

  const changeRating = (rating: number | null) => {
    setValue(rating);
    setIsRated(true);
    setError("");
  };

  const changeComment = (text: string) => {
    setComment(text);
    setError("");
  };

  return (
    <div className="Feedback">
      <h5 className="feedback-header">
        {props.userToRate.first_name} {props.userToRate.last_name}
      </h5>
      <img
        src={props.userToRate.image}
        alt={props.userToRate.first_name}
        className="user-image"
      />
      <span className="your-rate-span">Place your rate here</span>
      <Rating
        className="star-rating"
        name="simple-controlled"
        value={value}
        precision={0.5}
        size="large"
        onChange={(event, newValue) => changeRating(newValue)}
      />
      <textarea
        className="feedback-area"
        cols={30}
        rows={5}
        placeholder={`Let us know how was your deal experience with ${props.userToRate.first_name} ${props.userToRate.last_name}...`}
        onChange={(e) => changeComment(e.target.value)}
      ></textarea>
      {error && <span className="error">{error}</span>}
      <div className="feedback-buttons">
        <button className="feedback-btn" onClick={() => props.onClose()}>
          Close
        </button>
        <button className="feedback-btn submit" onClick={sendRating}>
          Submit
        </button>
      </div>
    </div>
  );
}

export default Feedback;
