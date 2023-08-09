import { useEffect, useRef, useState } from "react";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import StepsDots from "../StepsDots/StepsDots";
import Slider from "react-slick";
import { Ticket } from "../../../models/Ticket";
import TicketsAmount from "../SellerModal/TicketsAmount";
import SelectArea from "./SelectArea";
import SellersSlider, { SellerTicket } from "./SellersSlider";
import NextPrevButtons from "../NextPrevButtons/NextPrevButtons";
import PlaceBid from "./PlaceBid";
import SaleCompleted from "../SellerModal/SaleCompleted";
import { useDispatch } from "react-redux";
import { userBidsActions } from "../../../store/userBidsSlice";
import PaymentDetails from "../../PaymentDetails/PaymentDetails";
import SecureDepositMsg from "../../PaymentDetails/SecureDepositMsg/SecureDepositMsg";
import { card_details } from "../../../models/CreditCard";
import { LanguageEventModal } from "../../../languageControl/Language";
import useTicketService from "../../../services/ticketService";
import useBidService from "../../../services/bidService";
import "../slick-theme.scss";
import "../slick.scss";
import "./BuyerModal.scss";

interface props {
  user: User | null;
  event: Event | null;
  data: LanguageEventModal;
  isHebrew: boolean;
}

function BuyerModal(props: props): JSX.Element {
  const data = props.data.BuyerModal;
  const sliderRef = useRef<any>(null);
  const ticketService = useTicketService();
  const bidService = useBidService();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [currentPrice, setCurrentPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [cardDetails, setCardDetails] = useState<card_details | null>(null);
  const [isConfirmedDeposit, setIsConfirmed] = useState(false);
  const [amount, setAmount] = useState(0);
  const [availableAreas, setAvailableAreas] = useState<string[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [nextReady, setNextReady] = useState(false);
  const [currentSeller, setCurrentSeller] = useState<SellerTicket | null>(null);
  const [ticketsToOffer, setTicketsToOffer] = useState<Ticket[]>([]);
  const [uploadStatus, setUploadStatus] = useState("");
  const dispatch = useDispatch();
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
  };

  useEffect(() => {
    setIsLoading(true);
    props.event?._id &&
      ticketService
        .getTicketsForSaleByEvent(props.event?._id)
        .then((res: Ticket[]) => {
          setTickets(res);
          const areas: string[] = [];
          res.forEach((ticket) => {
            if (!areas.includes(ticket.area)) areas.push(ticket.area);
          });
          setAvailableAreas(areas);
          setIsLoading(false);
        })
        .catch((err) => setIsLoading(false));
  }, [props.event?._id]);

  const changeAmount = (value: number) => {
    setAmount(value);
    setNextReady(true);
  };

  const changeArea = (areas: string[]) => {
    setSelectedAreas(areas);
    setNextReady(areas.length > 0);
  };

  const changeSeller = (seller: SellerTicket) => {
    setCurrentSeller(seller);
    setNextReady(true);
  };

  const changeBid = (tickets: Ticket[]) => {
    setTicketsToOffer(tickets);
    setNextReady(tickets.length > 0);
  };

  const confirmDepositMsg = (isChecked: boolean) => {
    setIsConfirmed(isChecked);
    setNextReady(isChecked);
  };

  const changePaymentDetails = (details: card_details, isValid: boolean) => {
    setCardDetails(details);
    setNextReady(isValid);
  };

  const moveForward = () => {
    if (currentSlide === 5) {
      setUploadStatus("Pending");
      bidService
        .addBid(
          ticketsToOffer,
          props.user?._id as string,
          +ticketsToOffer[0].price
        )
        .then((res) => {
          if (res.status === 201) {
            dispatch(userBidsActions.addNewBid(res.data));
            setUploadStatus("Success");
          } else setUploadStatus("Failed");
        })
        .catch((err) => setUploadStatus("Failed"));
    }
    sliderRef.current.slickNext();
    setCurrentSlide((prev) => ++prev);
    if (currentSlide === 0) setNextReady(selectedAreas.length > 0);
    else if (currentSlide === 1)
      setNextReady(currentSeller?._id ? true : false);
    else if (currentSlide === 2) setNextReady(ticketsToOffer.length > 0);
    else if (currentSlide === 3) setNextReady(isConfirmedDeposit);
    else setNextReady(false);
  };
  const moveBackwards = () => {
    sliderRef.current.slickPrev();
    setCurrentSlide((prev) => --prev);
    setNextReady(true);
  };

  const handleAfterChange = (index: number) => setCurrentSlide(index);

  return (
    <div className="BuyerModal">
      <StepsDots currentSlide={currentSlide} slides={6} />
      <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange}>
        <TicketsAmount
          onSubmit={changeAmount}
          event={props.event}
          data={props.data}
        />
        <SelectArea
          areas={availableAreas}
          onSubmit={changeArea}
          data={data}
          isLoading={isLoading}
        />
        <SellersSlider
          onSubmit={changeSeller}
          tickets={tickets.filter((t) => selectedAreas.includes(t.area))}
          amount={amount}
          currentSeller={currentSeller}
          data={data}
        />
        <PlaceBid
          data={data}
          onSubmit={changeBid}
          user={props.user}
          event={props.event}
          currentSeller={currentSeller}
        />
        <SecureDepositMsg
          isHebrew={props.isHebrew}
          data={data}
          user={props.user}
          onSubmit={confirmDepositMsg}
          isChecked={isConfirmedDeposit}
        />
        <PaymentDetails
          onSubmit={changePaymentDetails}
          price={currentPrice}
          data={data}
          isHebrew={props.isHebrew}
        />
        <SaleCompleted buyerMode data={props.data} status={uploadStatus} />
      </Slider>
      {currentSlide !== 6 && (
        <NextPrevButtons
          allowNext={nextReady}
          onMoveForward={moveForward}
          onMoveBackwards={moveBackwards}
          isFirstStep={currentSlide === 0}
        />
      )}
    </div>
  );
}

export default BuyerModal;
