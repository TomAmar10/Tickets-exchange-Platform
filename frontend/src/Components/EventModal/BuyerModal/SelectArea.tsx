import { useState } from "react";
import "./SelectArea.scss";
import { LanguageBuyerModal } from "../../../languageControl/Language";
import Spinner from "../../UI/Spinner";

interface props {
  onSubmit: Function;
  areas: string[];
  data: LanguageBuyerModal;
  isLoading: boolean;
}

function SelectArea(props: props): JSX.Element {
  const data = props.data.SelectArea;
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);

  const toggleArea = (value: string) => {
    const areas = [...selectedAreas];
    const index = selectedAreas.findIndex((s) => s === value);
    if (index === -1) areas.push(value);
    else areas.splice(index, 1);
    setSelectedAreas(areas);
    props.onSubmit(areas);
  };

  return (
    <div className="SelectArea">
      <img
        src="https://seatlab.com/wp-content/uploads/Screenshot-2020-09-10-at-11.06.36-1024x802.png"
        alt="venue"
        className="venue-image"
      />
      <h5 className="buy-ticket-section-header">{data.header}</h5>
      {props.isLoading ? (
        <Spinner style={{ marginTop: "2rem" }} />
      ) : (
        <div className="available-area-container">
          {props.areas.map((a) => (
            <button
              key={a}
              className={`area-button ${
                selectedAreas.includes(a) ? "selected" : ""
              }`}
              onClick={() => toggleArea(a)}
            >
              {a}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SelectArea;
