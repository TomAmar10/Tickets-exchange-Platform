import { useRef, useState } from "react";
import Slider from "react-slick";
import { Event } from "../../../models/Event";
import { User } from "../../../models/User";
import TicketsAmount from "./TicketsAmount";
import TicketsDetails from "./TicketsDetails";
import TicketUpload from "./TicketUpload";
import SaleCompleted from "./SaleCompleted";
import { Ticket } from "../../../models/Ticket";
import StepsDots from "../StepsDots/StepsDots";
import NextPrevButtons from "../NextPrevButtons/NextPrevButtons";
import convertToBase64 from "../../../utils/convertBase64";
import { useDispatch } from "react-redux";
import { userTicketsActions } from "../../../store/userTicketsSlice";
import { LanguageEventModal } from "../../../languageControl/Language";
import useTicketService from "../../../services/ticketService";
import "../slick-theme.scss";
import "../slick.scss";
import "./SellerModal.scss";

interface props {
  user: User | null;
  event: Event | null;
  maxToSell: number;
  data: LanguageEventModal;
  isHebrew: boolean;
}

function SellerModal(props: props): JSX.Element {
  const data = props.data.SellerModal;
  const ticketService = useTicketService();
  const sliderRef = useRef<any>(null);
  const [nextReady, setNextReady] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDetailsValid, setIsDetailsValid] = useState(false);
  const [isImagesValid, setIsImagesValid] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const dispatch = useDispatch();
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    draggable: false,
    adaptiveHeight: true,
    rtl: false,
  };

  const changeAmount = (value: number) => {
    if (isDetailsValid) setIsDetailsValid(value <= tickets.length);
    if (isImagesValid) setIsImagesValid(value <= tickets.length);
    const ticketsArray = [];
    for (let i = 0; i < value; i++) {
      const newTicket = {
        type: "Regular",
        currency: "USD",
        id_event: props.event?._id,
        id_owner: props.user?._id,
      } as Ticket;
      ticketsArray.push(newTicket);
    }
    setTickets(ticketsArray);
    setNextReady(value > 0);
  };

  const changeTicketDetails = (newTickets: Ticket[], isValid: boolean) => {
    setTickets(newTickets);

    if (isValid) setIsDetailsValid(true);
    setNextReady(isValid);
  };

  const changeTicketFiles = async (
    files: File[],
    proofFile: File,
    isValid: boolean
  ) => {
    if (isValid) {
      const newTickets = await Promise.all(
        tickets.map(async (t, i) => {
          return {
            ...t,
            image: await convertToBase64(files[i]),
          };
        })
      );
      setTickets(newTickets as Ticket[]);
    }
    if (isValid) setIsImagesValid(true);
    setNextReady(isValid);
  };

  const moveForward = () => {
    if (!props.user) return;
    sliderRef.current.slickNext();
    setCurrentSlide((prev) => ++prev);
    if (currentSlide === 0) setNextReady(isDetailsValid);
    if (currentSlide === 1) setNextReady(isImagesValid);
    if (currentSlide === 2) {
      setUploadStatus("Pending");
      ticketService
        .addTickets(tickets, props.user)
        .then((res) => {
          if (res.status === 201) {
            dispatch(userTicketsActions.addTickets(res.data));
            setUploadStatus("Success");
          } else setUploadStatus("Failed");
        })
        .catch((err) => setUploadStatus("Failed"));
    }
  };
  const moveBackwards = () => {
    sliderRef.current.slickPrev();
    setCurrentSlide((prev) => --prev);
    setNextReady(true);
  };
  const handleAfterChange = (index: number) => setCurrentSlide(index);

  return (
    <div className="SellerModal">
      <StepsDots currentSlide={currentSlide} slides={3} />
      <Slider ref={sliderRef} {...settings} afterChange={handleAfterChange}>
        <TicketsAmount
          data={props.data}
          onSubmit={changeAmount}
          event={props.event}
          amount={tickets.length}
          maxToSell={props.maxToSell}
        />
        <TicketsDetails
          data={data}
          isHebrew={props.isHebrew}
          tickets={tickets}
          onSubmit={changeTicketDetails}
        />
        <TicketUpload
          tickets={tickets}
          onSubmit={changeTicketFiles}
          data={data}
        />
        <SaleCompleted
          status={uploadStatus}
          user={props.user}
          amount={tickets.length}
          sellerMode
          data={props.data}
        />
      </Slider>
      {currentSlide !== 3 && (
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

export default SellerModal;
