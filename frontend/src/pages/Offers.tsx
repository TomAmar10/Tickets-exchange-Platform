import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/store";
import SentOffers from "../Components/UserOffers/SentOffers/SentOffers";
import ReceivedOffers from "../Components/UserOffers/ReceivedOffers/ReceivedOffers";
import useBidService from "../services/bidService";
import { useState } from "react";
import { Bid } from "../models/Bid";
import { userBidsActions } from "../store/userBidsSlice";
import OffersModal from "../Components/UserOffers/OffersModal/OffersModal";

function OffersPage(): JSX.Element {
  const dispatch = useDispatch();
  const bidService = useBidService();
  const [bidToShow, setBidToShow] = useState<Bid | null>(null);
  const [bidToTransfer, setBidToTransfer] = useState<Bid | null>(null);
  const langData = useSelector((state: IStore) => state.language.langData);
  const language = useSelector((state: IStore) => state.language.language);
  const user = useSelector((state: IStore) => state.user.user);
  const offersReceived = useSelector(
    (state: IStore) => state.userBids.offersReceived
  );
  const offersSent = useSelector((state: IStore) => state.userBids.offersSent);

  const acceptOfferClick = (bid: Bid) => {
    setBidToTransfer(bid);
  };

  const viewStatus = (bid: Bid) => setBidToShow(bid);

  const cancelBid = (bid: Bid) => {
    bidService.deleteBid(bid._id as string).then((res) => console.log(res));
    dispatch(userBidsActions.cancelBid(bid));
  };

  const clearModal = () => {
    setBidToShow(null);
    setBidToTransfer(null);
  };

  // --------------- FOR REJECTED BIDS ---------------
  // const placeNewBid = (bid: Bid, newPrice: number) => {
  //   const tickets = (bid.tickets as EventTicket[])[0].ticketsArray;
  //   bidService
  //     .addBid(tickets, user?._id as string, newPrice)
  //     .then((res) => dispatch(userBidsActions.addNewBid(res.data)));
  // };

  return (
    <>
      {user && (
        <>
          <SentOffers
            user={user}
            data={langData}
            isHebrew={language === "HEBREW"}
            sentBids={offersSent || []}
            onViewStatus={viewStatus}
            onCancelBid={cancelBid}
          />
          <ReceivedOffers
            user={user}
            data={langData}
            isHebrew={language === "HEBREW"}
            receivedBids={offersReceived || []}
            onAcceptOfferClick={acceptOfferClick}
          />
          {(bidToShow || bidToTransfer) && (
            <OffersModal
              bidToShow={bidToShow}
              bidToTransfer={bidToTransfer}
              onClearModal={clearModal}
            />
          )}
        </>
      )}
    </>
  );
}

export default OffersPage;
