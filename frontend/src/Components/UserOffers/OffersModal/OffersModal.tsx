import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import useBidService from "../../../services/bidService";
import useDealService from "../../../services/dealService";
import { useState } from "react";
import { card_details } from "../../../models/CreditCard";
import { Bid, StatusBid } from "../../../models/Bid";
import SecureDepositMsg from "../../PaymentDetails/SecureDepositMsg/SecureDepositMsg";
import PaymentDetails from "../../PaymentDetails/PaymentDetails";
import CongratsMsg from "../../UI/CongratsMsg/CongratsMsg";
import BidStatusModal from "../../BidStatusModal/BidStatusModal";
import { userBidsActions } from "../../../store/userBidsSlice";
import "./OffersModal.scss";

interface props {
  onClearModal: Function;
  bidToShow: Bid | null;
  bidToTransfer: Bid | null;
}

function OffersModal(props: props): JSX.Element {
  const dispatch = useDispatch();
  const bidService = useBidService();
  const dealService = useDealService();
  const [isValid, setIsValid] = useState(false);
  const [currStep, setCurrStep] = useState<number>(1);
  const langData = useSelector((state: IStore) => state.language.langData);
  const language = useSelector((state: IStore) => state.language.language);
  const user = useSelector((state: IStore) => state.user.user);

  const submitSecureDeposit = () => setCurrStep(2);

  const validatePayment = (details: card_details, isValid: boolean) => {
    setIsValid(isValid);
    // setCreditCard(details);
    console.log(details);
  };

  const completeDeposit = () => {
    if (!props.bidToTransfer) return;
    setCurrStep(3);
    const bid = {
      ...props.bidToTransfer,
      status: StatusBid.CONFIRMED,
      tickets: (props.bidToTransfer.tickets[0] as any).ticketsArray,
    };
    dealService.transferTicket(bid).then((res) => {
      bidService.updateBid(bid);
    });

    dispatch(userBidsActions.confirmBid(bid));
  };

  return (
    <div className="OffersModal">
      {props.bidToTransfer && (
        <div className="deposit-stage">
          {currStep === 1 && (
            <SecureDepositMsg
              isHebrew={language === "HEBREW"}
              data={langData}
              seller
              user={user}
              onSubmit={submitSecureDeposit}
            />
          )}
          {currStep === 2 && (
            <>
              <PaymentDetails
                price={0}
                onSubmit={validatePayment}
                data={langData}
                isHebrew={language === "HEBREW"}
              />
              <div className="payments-button">
                <button disabled={!isValid} onClick={completeDeposit}>
                  {langData.confirmDeposit}
                </button>
              </div>
            </>
          )}
          {currStep === 3 && (
            <CongratsMsg user={user} bid={props.bidToTransfer} />
          )}
        </div>
      )}
      {props.bidToShow && (
        <BidStatusModal
          bid={props.bidToShow}
          user={user}
          clearModal={props.onClearModal}
          data={langData}
        />
      )}
      {(props.bidToTransfer || props.bidToShow) && (
        <div
          className="offers-modal-background"
          onClick={() => props.onClearModal()}
        ></div>
      )}
    </div>
  );
}

export default OffersModal;
