import { useEffect, useRef, useState } from "react";
import RandomBg from "../../../assets/random-show-bg.jpg";
import { Category } from "../../../models/Category";
import { Event } from "../../../models/Event";
import { useForm } from "react-hook-form";
import EventAdded from "./EventAdded";
import { Role, User } from "../../../models/User";
import { useSelector } from "react-redux";
import { IStore } from "../../../store/store";
import convertToBase64 from "../../../utils/convertBase64";
import "./EventForm.scss";
import { LanguageEventModal } from "../../../languageControl/Language";
import useEventService from "../../../services/eventService";

interface props {
  user: User | null;
  event?: Event | null;
  data: LanguageEventModal;
  isHebrew: boolean;
}

function EventForm(props: props): JSX.Element {
  const data = props.data.EventForm;
  const eventService = useEventService();
  const categories = useSelector(
    (state: IStore) => state.categories.categories
  );
  const currDate = new Date().toISOString().slice(0, 16);
  const { register, handleSubmit, reset } = useForm<Event>();
  const [addedEvent, setAddedEvent] = useState<Event | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [currentImg, setCurrentImg] = useState<string | null>(null);
  const [imgName, setImgName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!props.event) return;
    const date = new Date(props.event?.date as string)
      .toISOString()
      .slice(0, 16);
    const event = {
      ...props.event,
      date,
      id_category: (props.event?.id_category as Category)._id as any,
    };
    if (props.event) reset(event);
  }, [props.event, reset]);

  const createEvent = (event: Event) => {
    if (!event.id_category && categories)
      (event.id_category as string) = (categories[0] as Category)._id;

    if (props.user?.role === Role.ADMIN) {
      if (!currentImg) {
        setImgName("Image is required");
        return;
      }
      eventService.updateEvent({
        ...event,
        image: currentImg,
        isApproved: true,
      });
    } else eventService.addEvent(event);
    setAddedEvent(event);
  };

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      setImageUrl(RandomBg);
      setCurrentImg(null);
      setImgName("");
      return;
    }
    const file = files[0];
    const newImg = URL.createObjectURL(file);
    setImageUrl(newImg);
    setImgName(file.name);
    const image = await convertToBase64(files[0]);
    setCurrentImg(image);
  };

  const openFileInput = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  return (
    <div className="EventForm">
      {addedEvent && <EventAdded user={props.user} event={addedEvent} />}
      {!addedEvent && (
        <>
          <img
            src={imageUrl || RandomBg}
            alt="event"
            className="random-bg-image"
          />
          <h5>{data.header}</h5>
          <form
            className={`event-form ${props.isHebrew && "hebrew"}`}
            onSubmit={handleSubmit(createEvent)}
          >
            <label htmlFor="event_name" className="event-form-label">
              {data.eventName}
            </label>
            <input
              id="event_name"
              type="text"
              className="event-form-input"
              placeholder={data.eventNamePlaceholder}
              maxLength={60}
              required
              {...register("event_name")}
            />
            <label htmlFor="category" className="event-form-label">
              {data.category}
            </label>
            <select
              id="category"
              className="event-form-select"
              required
              {...register("id_category")}
            >
              {categories?.map((c) => (
                <option value={c._id} key={c._id}>
                  {props.isHebrew ? c.hebrew : c.name}
                </option>
              ))}
            </select>
            <label htmlFor="location" className="event-form-label">
              {data.location}
            </label>
            <input
              id="location"
              type="text"
              className="event-form-input"
              placeholder={data.locationPlaceholder}
              maxLength={55}
              required
              {...register("location")}
            />
            <label htmlFor="description" className="event-form-label">
              {data.description}
            </label>
            <input
              id="description"
              type="text"
              className="event-form-input"
              placeholder={data.descriptionPlaceholder}
              maxLength={55}
              required
              {...register("description")}
            />
            {props.user?.role === Role.ADMIN && (
              <>
                <label
                  htmlFor="image"
                  className="event-form-label"
                  onClick={openFileInput}
                >
                  {data.image}
                  <input
                    disabled
                    placeholder={data.imagePlaceholder}
                    value={imgName}
                    type="text"
                    className="event-form-input"
                  />
                </label>
                <input
                  onChange={(e) => changeImage(e)}
                  id="image"
                  type="file"
                  className="event-form-input"
                  hidden
                  ref={fileInputRef}
                />
              </>
            )}
            <label htmlFor="date" className="event-form-label">
              {data.eventDate}
            </label>
            <input
              id="date"
              type="datetime-local"
              className="event-form-input"
              min={currDate}
              required
              {...register("date")}
            />
            <button className="submit-form-event-btn">
              {props.event ? data.approveBtn : data.createBtn}
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default EventForm;
