import { useEffect } from "react";
import { Ticket } from "../models/Ticket";
import config from "../utils/config";
import { axiosInstance as axios } from "../utils/config";
import { User } from "../models/User";
import { userTicketsActions } from "../store/userTicketsSlice";
import { useDispatch } from "react-redux";

interface Service {
  getAllTickets: () => Promise<any>;
  getTicket: (id: string) => Promise<Ticket>;
  getTicketsForSaleByEvent: (eventId: string) => Promise<Ticket[]>;
  getUserTicketsForSaleByEvent: (
    userId: string,
    eventId: string
  ) => Promise<Ticket[]>;
  getUserTickets: (userId: string) => Promise<Ticket[]>;
  addTickets: (tickets: Ticket[] | any, user: User) => Promise<any>;
  deleteTicket: (details: Ticket, token: string) => Promise<any>;
  updateTicket: (ticket: Ticket) => Promise<any>;
}

const useTicketService = (): Service => {
  const dispatch = useDispatch();
  
  const getAllTickets = async (): Promise<any> => {
    try {
      const response = await axios.get(config.ticketURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getTicket = async (id: string): Promise<Ticket> => {
    try {
      const response = await axios.get(`${config.ticketURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getTicketsForSaleByEvent = async (
    eventId: string
  ): Promise<Ticket[]> => {
    try {
      const response = await axios.get(
        `${config.ticketURL.getForSaleByEvent}/${eventId}`
      );
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getUserTicketsForSaleByEvent = async (
    userId: string,
    eventId: string
  ): Promise<Ticket[]> => {
    try {
      const response = await axios.get(
        `${config.ticketURL.getForSaleByUserEvent}/${userId}/${eventId}`
      );
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getUserTickets = async (userId: string): Promise<Ticket[]> => {
    try {
      const response = await axios.get(
        `${config.ticketURL.getUserTickets}/${userId}`
      );
      dispatch(userTicketsActions.setTickets(response.data));
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addTickets = async (
    tickets: Ticket[] | any,
    user: User
  ): Promise<any> => {
    try {
      const response = await axios.post(config.ticketURL.createFew, tickets, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const deleteTicket = async (details: Ticket, token: string) => {
    try {
      await axios.post(config.ticketURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  const updateTicket = async (ticket: Ticket) => {
    try {
      const response = await axios.patch(
        `${config.ticketURL.update}/${ticket._id}`,
        ticket
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  useEffect(() => {
    // Do any setup or cleanup here if needed
    // The effect will be triggered on component mount and update
    // Since this is a service hook, you might not need the useEffect hook
  }, []);

  return {
    getAllTickets,
    getTicket,
    getTicketsForSaleByEvent,
    getUserTicketsForSaleByEvent,
    getUserTickets,
    addTickets,
    deleteTicket,
    updateTicket,
  };
};

export default useTicketService;
