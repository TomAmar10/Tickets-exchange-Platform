import { useSelector } from "react-redux";
import UserSettings from "../Components/UserProfile/UserSettings/UserSettings";
import { IStore } from "../store/store";
import UserFeedbacks from "../Components/UserProfile/UserFeedbacks/UserFeedbacks";
import FavoriteEvents from "../Components/UserProfile/FavoriteEvents/FavoriteEvents";
import { useEffect, useState } from "react";
import { Event } from "../models/Event";

function ProfilePage(): JSX.Element {
  const langData = useSelector((state: IStore) => state.language.langData);
  const user = useSelector((state: IStore) => state.user.user);
  const events = useSelector((state: IStore) => state.events.events);
  const [favorites, setFavorites] = useState<Event[]>([]);

  useEffect(() => {
    if (events) {
      const newFavorites = events.filter((e) =>
        user?.favorites.includes(e._id as string)
      );
      setFavorites(newFavorites);
    }
  }, [events, user?.favorites]);

  return (
    <>
      {user && (
        <>
          <UserSettings user={user} />
          <UserFeedbacks user={user} />
          <FavoriteEvents user={user} favorites={favorites || []} />
        </>
      )}
    </>
  );
}

export default ProfilePage;
