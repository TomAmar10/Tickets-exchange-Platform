import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { Category } from "../models/Category";
import { Event } from "../models/Event";
import { useDispatch } from "react-redux";
import { eventActions } from "../store/eventSlice";
import { categoryAction } from "../store/categorySlice";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface EventService {
  getInitialEvents: () => Promise<any>;
  getAllCategories: () => Promise<any>;
  getCategory: () => Promise<Category>;
  getEvent: (id: string) => Promise<Event>;
  addEvent: (event: Event) => Promise<any>;
  deleteEvent: (details: Event, token: string) => Promise<any>;
  updateEvent: (event: Event) => Promise<any>;
}

const useEventService = (): EventService => {
  const dispatch = useDispatch();
  const location = useLocation();

  const getInitialEvents = async (): Promise<any> => {
    dispatch(eventActions.startLoading());
    try {
      const response = await axios.get(config.eventURL.getAll);
      dispatch(
        eventActions.setEvents(
          response.data
            .filter((e: Event) => e.isApproved)
            .sort(
              (a: Event, b: Event) =>
                new Date(a.date).getTime() - new Date(b.date).getTime()
            )
        )
      );
      const categories = response.data.reduce(
        (categories: Category[], event: Event) => {
          const existingCategory = categories.find(
            (category) => category._id === event.id_category._id
          );
          if (!existingCategory) categories.push(event.id_category);
          return categories;
        },
        []
      );
      dispatch(categoryAction.setCategories(categories));
      dispatch(eventActions.finishLoading());
      return response;
    } catch (err: any) {
      dispatch(eventActions.finishLoading());
      return err.response.data.msg;
    }
  };

  const getAllCategories = async (): Promise<any> => {
    try {
      const response = await axios.get(config.categoryURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  const getCategory = async (): Promise<Category> => {
    try {
      const response = await axios.get(config.eventURL.getSingle);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  const getEvent = async (id: string): Promise<Event> => {
    try {
      const response = await axios.get(`${config.eventURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data.msg;
    }
  };

  const addEvent = async (event: Event): Promise<any> => {
    try {
      const response = await axios.post(config.eventURL.create, event);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const deleteEvent = async (details: Event, token: string) => {
    try {
      await axios.post(config.eventURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  const updateEvent = async (event: Event) => {
    try {
      const response = await axios.patch(
        `${config.eventURL.update}/${event._id}`,
        event
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  useEffect(() => {
    dispatch(eventActions.clearSingleEvent());
  }, [location, dispatch]);

  return {
    getInitialEvents,
    getAllCategories,
    getCategory,
    getEvent,
    addEvent,
    deleteEvent,
    updateEvent,
  };
};

export default useEventService;
