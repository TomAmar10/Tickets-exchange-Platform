import { User } from "../../models/User";
import UserImage from "../../assets/random-profile.png";
import CreditCard from "../../assets/credit-card-image.png";
import { Rating } from "@mui/material";
import LangModel from "../../languageControl/Language";
import "./UserWallet.scss";

interface props {
  user: User | null;
  data: LangModel;
}

function UserWallet(props: props): JSX.Element {
  const user = props.user;
  const data = props.data.UserWallet;
  return (
    <div className="UserWallet">
      <div className="about-balance-container">
        <div className="about-user">
          <div className="personal-details">
            <img
              className="user-img"
              src={user?.image || UserImage}
              alt={user?.first_name}
            />
            <h4 className="user-name">
              {user?.first_name} {user?.last_name}
            </h4>
            <Rating
              value={+(user?.total_rating ?? 0)}
              readOnly
              precision={0.5}
              size="medium"
            />
          </div>
        </div>
        <div className="balance">
          <h5>{data.balance}</h5>
          <h2>100$</h2>
        </div>
      </div>
      <div className="user-profile-sections">
        <div className="sections-container">
          <div className="credit-cards section">
            <h5 className="header">{data.creditCards}</h5>
            <div className="content">
              <div className="list credit-list">
                <div className="single-card">
                  <img src={CreditCard} alt="credit" />
                  <img src={CreditCard} alt="credit" />
                </div>
              </div>
              <button className="view-more-btn">+ {data.addCard}</button>
            </div>
          </div>
          <div className="activities section">
            <h5 className="header">{data.activities}</h5>
            <div className="content">
              <div className="list">{data.comingSoon}</div>
              <button className="view-more-btn">{data.viewMore}</button>
            </div>
          </div>
        </div>
        <div className="sections-container">
          <div className="coupons section">
            <h5 className="header">{data.coupons}</h5>
            <div className="content">
              <div className="list">{data.comingSoon}</div>
              <button className="view-more-btn">{data.viewMore}</button>
            </div>
          </div>
          <div className="gift-cards section">
            <h5 className="header">{data.giftCards}</h5>
            <div className="content">
              <div className="list">{data.comingSoon}</div>
              <button className="view-more-btn">{data.viewMore}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserWallet;
