import { useSelector } from "react-redux";
import "./StepsDots.scss";
import { IStore } from "../../../store/store";

interface props {
  currentSlide: number;
  slides: number;
}
function StepsDots(props: props): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const data = langData.EventModal.StepsDots;
  const steps = [];
  for (let i = 0; i < props.slides; i++) {
    steps.push(
      <div className="single-step-holder" key={i}>
        <span className="step-span">
          {data.step} {i + 1}
        </span>
        <div
          className={`single-step ${
            props.currentSlide === i ? "active-slide" : ""
          } ${props.currentSlide > i ? "previous" : ""}`}
        >
          {props.currentSlide > i ? "✓" : ""}
        </div>
      </div>
    );
  }
  return (
    <div className="StepsDots">
      <div className="dots-area">{steps}</div>
      <div className="dots-splitter"></div>
    </div>
  );
}

export default StepsDots;
