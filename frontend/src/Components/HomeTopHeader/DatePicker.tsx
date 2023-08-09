import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./DatePicker.scss";

interface props {
  onDatesChange: Function;
  datesRange: any;
}

function DatePicker(props: props): JSX.Element {
  const datesRef = useRef<HTMLDivElement | null>(null);

  const [isCalendarOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Adding functions to close the dates picker.
    document.addEventListener("keydown", handleEscapeClick);
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeClick);
    };
  }, []);

  const handleEscapeClick = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (datesRef.current && !datesRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const datesChange = (dates: any) => props.onDatesChange(dates);

  return (
    <div className="DatePicker" ref={datesRef}>
      <input
        className="search-input"
        type="text"
        value={`${format(
          props.datesRange[0].startDate,
          "MM/dd/yyyy"
        )} -- ${format(props.datesRange[0].endDate, "MM/dd/yyyy")}`}
        readOnly
        onClick={() => setIsOpen((prev) => !prev)}
      />
      {isCalendarOpen && (
        <DateRange
          date={new Date()}
          onChange={(item) => datesChange([item.selection])}
          editableDateInputs={true}
          moveRangeOnFirstSelection={false}
          ranges={props.datesRange}
          months={1}
          direction="horizontal"
          className="calendarElement"
        />
      )}
    </div>
  );
}

export default DatePicker;
