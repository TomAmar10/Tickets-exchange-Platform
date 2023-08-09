import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Event } from "../models/Event";
import useEventService from "../services/eventService";

function SingleEventPage(): JSX.Element {
  const { eventId } = useParams();
  const eventService = useEventService();
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    eventId && eventService.getEvent(eventId).then((res) => setEvent(res));
  }, [eventId, eventService]);

  return (
    <main className="container-main">
      
    </main>
  );
}

export default SingleEventPage;
