import { useSelector } from "react-redux";
import "./NextPrevButtons.scss";
import { IStore } from "../../../store/store";

interface props {
  isFirstStep: boolean | undefined;
  allowNext: boolean;
  onMoveForward: Function | undefined;
  onMoveBackwards: Function | undefined;
}
function NextPrevButtons(props: props): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const language = useSelector((state: IStore) => state.language.language);
  const data = langData.EventModal.NextPrevButtons;
  return (
    <div className={`NextPrevButtons ${language === "HEBREW" && "hebrew"}`}>
      <button
        className="sell-ticket-nav"
        onClick={() => props.onMoveForward && props.onMoveForward()}
        disabled={!props.allowNext}
      >
        {data.next}
      </button>
      {!props.isFirstStep && (
        <button
          className="sell-ticket-nav"
          onClick={() => props.onMoveBackwards && props.onMoveBackwards()}
        >
          {data.prev}
        </button>
      )}
    </div>
  );
}

export default NextPrevButtons;
