import { AxiosResponse } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/store";
import { userActions } from "../store/authSlice";
import { User } from "../models/User";
import config from "../utils/config";
import { axiosInstance as axios } from "../utils/config";

interface Service {
  getAllUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  addRating: (
    id_userToRate: string,
    rating: any
  ) => Promise<AxiosResponse<any, any> | null>;
  addFavoriteEvent: (
    id_event: string
  ) => Promise<AxiosResponse<any, any> | null>;
  removeFavoriteEvent: (
    id_event: string
  ) => Promise<AxiosResponse<any, any> | null>;
  favorites: string[];
}

const useUserService = (): Service => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: IStore) => state.user.favorites);
  const user = useSelector((state: IStore) => state.user.user);

  const getAllUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get(config.userURL.getAll);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getUser = async (id: string): Promise<User> => {
    try {
      const response = await axios.get(`${config.userURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addRating = async (id_userToRate: string, rating: any) => {
    try {
      const response = await axios.post(
        `${config.userURL.addRating}/${id_userToRate}`,
        rating
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addFavoriteEvent = async (id_event: string) => {
    dispatch(userActions.toggleFavorite(id_event));
    try {
      const response = await axios.post(
        `${config.userURL.addFavorite}/${user?._id}`,
        { id_event }
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const removeFavoriteEvent = async (id_event: string) => {
    dispatch(userActions.toggleFavorite(id_event));
    try {
      const response = await axios.post(
        `${config.userURL.removeFavorite}/${user?._id}`,
        { id_event }
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };


  return {
    getAllUsers,
    getUser,
    addRating,
    addFavoriteEvent,
    removeFavoriteEvent,
    favorites,
  };
};

export default useUserService;
