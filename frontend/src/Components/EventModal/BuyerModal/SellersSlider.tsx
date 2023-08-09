import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import { Ticket } from "../../../models/Ticket";
import SingleSellerCard from "./SingleSellerCard";
import { filterSortTickets } from "../../../utils/ticketsFilter";
import "./SellersSlider.scss";
import { LanguageBuyerModal } from "../../../languageControl/Language";

interface props {
  onSubmit: Function;
  tickets: Ticket[];
  amount: number;
  currentSeller: SellerTicket | null;
  data: LanguageBuyerModal;
}

export interface SellerTicket extends Ticket {
  ticketsArray: Ticket[];
}

function SellersSlider(props: props): JSX.Element {
  const data = props.data.SellersSlider;
  const [tickets, setTickets] = useState<SellerTicket[]>([]);
  const sliderRef = useRef<any>(null);
  const settings = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    if (props.tickets.length < 1) return;
    const newTicketsArr = filterSortTickets(props.tickets, props.amount);
    setTickets(newTicketsArr);
  }, [props.amount, props.tickets]);

  const changeSeller = (seller: SellerTicket) => props.onSubmit(seller);

  return (
    <div className="SellersSlider">
      <h5 className="buy-ticket-section-header">{data.header}</h5>
      {tickets.length > 6 && (
        <div className="slider-arrows-container">
          <button
            onClick={() => sliderRef.current?.slickNext()}
            className="arrow-right-btn"
          >
            <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="arrow-left-btn"
          >
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
        </div>
      )}
      <Slider {...settings} ref={sliderRef}>
        {tickets.map((t, index) => {
          if (index % 6 === 0) {
            const sellers = [];
            for (let i = index; i < Math.min(index + 6, tickets.length); i++) {
              sellers.push(
                <SingleSellerCard
                  data={data}
                  onClick={() => changeSeller(tickets[i])}
                  isActive={props.currentSeller?._id === tickets[i]._id}
                  key={tickets[i]._id}
                  ticket={tickets[i]}
                />
              );
            }
            return (
              <div key={index} className="six-sellers-holder">
                {sellers}
              </div>
            );
          } else return null;
        })}
      </Slider>
    </div>
  );
}

export default SellersSlider;
