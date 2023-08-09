import { User } from "../../../models/User";
import LangModel from "../../../languageControl/Language";
import { Bid } from "../../../models/Bid";
import SingleUserTicket from "../SingleUserTicket/SingleUserOffer";
import "./SentOffers.scss";

interface props {
  user: User | null;
  isHebrew: boolean;
  data: LangModel;
  sentBids: Bid[];
  onViewStatus: Function;
  onCancelBid: Function;
}

function SentOffers(props: props): JSX.Element {
  return (
    <div className="SentOffers user-page-section">
      <h4 className="section-header">Sent Offers</h4>
      <hr />
      <div className="events-tickets-container">
        {props.sentBids.map((b) => (
          <SingleUserTicket
            key={`${b._id}-sent-offer`}
            bid={b}
            user={props.user}
            onViewStatus={props.onViewStatus}
            onCancelBid={props.onCancelBid}
          />
        ))}
      </div>
    </div>
  );
}

export default SentOffers;
