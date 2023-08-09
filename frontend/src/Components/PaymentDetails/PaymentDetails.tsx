import CreditCard from "../../assets/credit-card-image.png";
import { logoImages } from "../../utils/file-import";
import { useForm } from "react-hook-form";
import { card_details } from "../../models/CreditCard";
import { useEffect } from "react";
import LangModel, { LanguageBuyerModal } from "../../languageControl/Language";
import "./PaymentDetails.scss";

interface props {
  price: number;
  onSubmit: Function;
  data: LanguageBuyerModal | LangModel;
  isHebrew: boolean;
}

function PaymentDetails(props: props): JSX.Element {
  const data = props.data.PaymentDetails;
  const { register, formState, watch } = useForm<card_details>();
  const formWatch = watch();

  useEffect(() => {
    props.onSubmit(formWatch, formState.isValid);
  }, [formState.isValid]);

  return (
    <div className={`PaymentDetails ${props.isHebrew && "hebrew"}`}>
      <div className="credit-card-image-container">
        <img src={CreditCard} alt="credit-card" className="credit-card-image" />
      </div>
      <form className="credit-card-form">
        <div className="use-saved-card-area">
          <label className="use-saved-label">{data.useSaved}</label>
          <select {...register("card_type", { required: true })}>
            <option value="mastercard">{data.mastercard}</option>
            <option value="visa">{data.visa}</option>
          </select>
        </div>
        <label>{data.name}</label>
        <input
          type="text"
          maxLength={50}
          {...register("card_name", { minLength: 2, required: true })}
        />
        <div className="card-form-section">
          <label>{data.number}</label>
          <input
            type="number"
            {...register("card_number", {
              required: true,
              minLength: 10,
              maxLength: 16,
            })}
          />
        </div>
        <div className="expiry-3-digits-area">
          <div className="expiry-section">
            <label>{data.expiry}</label>
            <input type="date" {...register("date", { required: true })} />
          </div>
          <div className="ccv-section">
            <label>{data.ccv}</label>
            <input
              type="password"
              {...register("digits", {
                required: true,
                minLength: 3,
                maxLength: 3,
              })}
            />
          </div>
        </div>
      </form>
      <div className="credit-logos">
        <img src={logoImages.visa} alt="visa" />
        <img src={logoImages.masterCard} alt="mastercard" />
        <img src={logoImages.americanExpress} alt="amex" />
      </div>
    </div>
  );
}

export default PaymentDetails;
