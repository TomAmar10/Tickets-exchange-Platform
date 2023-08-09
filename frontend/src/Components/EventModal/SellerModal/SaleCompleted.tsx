import { useDispatch } from "react-redux";
import "./SaleCompleted.scss";
import { eventActions } from "../../../store/eventSlice";
import { useNavigate } from "react-router-dom";
import { User } from "../../../models/User";
import { LanguageEventModal } from "../../../languageControl/Language";
import Spinner from "../../UI/Spinner";

interface props {
  buyerMode?: boolean;
  sellerMode?: boolean;
  user?: User | null;
  amount?: number;
  data: LanguageEventModal;
  status?: string;
}

function SaleCompleted(props: props): JSX.Element {
  const data = props.data.SaleCompleted;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isPending = props.status === "Pending";
  const isSucceeded = props.status === "Success";

  const goToTicket = () => {
    dispatch(eventActions.clearSingleEvent());
    const goTo = props.sellerMode ? "tickets" : "offers";
    navigate(`/profile/${props.user?._id}/${goTo}`);
  };

  return (
    <div className="SaleCompleted">
      {isPending ? (
        <Spinner style={{marginTop: '25%'}}/>
      ) : isSucceeded ? (
        <>
          <div className="congrats-container">
            <i className="fa-solid fa-circle-check"></i>
            <h2>{data.header}</h2>
            {props.sellerMode && <p>{data.sellerMsg}</p>}
            {props.buyerMode && <p>{data.buyerMsg}</p>}
          </div>
          <button className="home-btn" onClick={goToTicket}>
            {props.sellerMode ? data.ticketsBtn : data.offersBtn}
          </button>
        </>
      ) : (
        <span className="failed-message">
          Something went wrong, please try again later
        </span>
      )}
    </div>
  );
}

export default SaleCompleted;
