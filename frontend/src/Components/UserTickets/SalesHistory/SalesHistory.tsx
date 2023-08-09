import { Bid } from "../../../models/Bid";
import { User } from "../../../models/User";
import SingleHistory from "./SingleHistory";
import "./SalesHistory.scss";

interface props {
  confirmedBids: Bid[];
  user: User;
}

function SalesHistory(props: props): JSX.Element {
  return (
    <div className="SalesHistory user-page-section">
      <h4 className="section-header">Sales History</h4>
      <hr />
      <div className="sales-history-container">
        {props.confirmedBids.map((d) => (
          <SingleHistory bid={d} />
        ))}
      </div>
    </div>
  );
}

export default SalesHistory;
