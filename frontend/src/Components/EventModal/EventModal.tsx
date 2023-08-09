import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserModes } from "../../store/authSlice";
import { eventActions } from "../../store/eventSlice";
import { IStore } from "../../store/store";
import SellerModal from "./SellerModal/SellerModal";
import EventPreview from "./EventPreview/EventPreview";
import EventForm from "./EventForm/EventForm";
import { Event } from "../../models/Event";
import { Ticket } from "../../models/Ticket";
import BuyerModal from "./BuyerModal/BuyerModal";
import LangModel from "../../languageControl/Language";
import "./EventModal.scss";

interface props {
  isNewEvent: boolean;
  data: LangModel;
  language: string;
}

function EventModal(props: props): JSX.Element {
  const data = props.data.EventModal;
  const isHebrew = props.language === "HEBREW";
  const user = useSelector((state: IStore) => state.user.user);
  const currentEvent = useSelector(
    (state: IStore) => state.events.currentEvent
  );
  const dispatch = useDispatch();
  const userMode = useSelector((state: IStore) => state.user.mode);
  const userEventTicketsForSale =
    useSelector((state: IStore) => state.userTickets.ticketsForSale)?.filter(
      (t) => (t.id_event as Event)._id === currentEvent?._id
    ) || [];
  const userConfirmedBids =
    useSelector(
      (state: IStore) => state.userBids.confirmedOffersReceived
    )?.filter(
      (b) =>
        ((b.tickets as Ticket[])[0].id_event as Event)._id === currentEvent?._id
    ) || [];
  const [isPreviewStage, setIsPreviewStage] = useState(true);

  const hideModal = () => {
    dispatch(eventActions.clearSingleEvent());
    dispatch(eventActions.endCreating());
  };

  return (
    <>
      <div className="EventModal">
        {props.isNewEvent || !currentEvent?.isApproved ? (
          <EventForm
            user={user}
            event={currentEvent}
            data={data}
            isHebrew={isHebrew}
          />
        ) : (
          <>
            {isPreviewStage ? (
              <EventPreview
                data={data}
                isHebrew={isHebrew}
                user={user}
                event={currentEvent}
                onMoveToSecondStep={() => setIsPreviewStage(false)}
                userMode={userMode}
                userTicketsForSale={userEventTicketsForSale}
                userConfirmedBids={userConfirmedBids}
              />
            ) : (
              <>
                {userMode === UserModes.SELLER ? (
                  <SellerModal
                    user={user}
                    event={currentEvent}
                    maxToSell={6 - userEventTicketsForSale.length}
                    data={data}
                    isHebrew={isHebrew}
                  />
                ) : (
                  <BuyerModal
                    user={user}
                    event={currentEvent}
                    data={data}
                    isHebrew={isHebrew}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
      <div className="EventModal-holder" onClick={hideModal}></div>
    </>
  );
}

export default EventModal;
