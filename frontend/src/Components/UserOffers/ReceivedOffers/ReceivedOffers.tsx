import { User } from "../../../models/User";
import LangModel from "../../../languageControl/Language";
import { Bid, StatusBid } from "../../../models/Bid";
import SingleUserTicket from "../SingleUserTicket/SingleUserOffer";
import { userBidsActions } from "../../../store/userBidsSlice";
import { useDispatch } from "react-redux";
import useBidService from "../../../services/bidService";
import "./ReceivedOffers.scss";

interface props {
  user: User | null;
  isHebrew: boolean;
  data: LangModel;
  receivedBids: Bid[];
  onAcceptOfferClick: Function;
}

function ReceivedOffers(props: props): JSX.Element {
  const dispatch = useDispatch();
  const bidService = useBidService();

  const declineOffer = (bid: Bid) => {
    bidService
      .updateBid({ ...bid, status: StatusBid.DECLINED })
      .then((res) => console.log(res));
    dispatch(
      userBidsActions.declineBid({ ...bid, status: StatusBid.DECLINED })
    );
  };

  return (
    <div className="ReceivedOffers user-page-section">
      <h4 className="section-header">Received Offers</h4>
      <hr />
      <div className="events-tickets-container">
        {props.receivedBids.map((b) => (
          <SingleUserTicket
            key={`${b._id}-received-offer`}
            bid={b}
            user={props.user}
            onAccept={props.onAcceptOfferClick}
            onDecline={declineOffer}
          />
        ))}
      </div>
    </div>
  );
}

export default ReceivedOffers;
