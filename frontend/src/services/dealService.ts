import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { Deal } from "../models/Deal";
import { Bid } from "../models/Bid";
import { Ticket } from "../models/Ticket";

interface DealService {
  getAllDeals: () => Promise<any>;
  getUserDeals: (userId: string) => Promise<any>;
  getDeal: (id: string) => Promise<Deal>;
  transferTicket: (bid: Bid) => Promise<any>;
  deleteDeal: (details: Deal, token: string) => Promise<any>;
  updateDeal: (deal: Deal) => Promise<any>;
}

const useDealService = (): DealService => {
  const getAllDeals = async (): Promise<any> => {
    try {
      const response = await axios.get(config.dealURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getUserDeals = async (userId: string): Promise<any> => {
    try {
      // Implement the logic to get user-specific deals using the user's ID
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getDeal = async (id: string): Promise<Deal> => {
    try {
      const response = await axios.get(`${config.dealURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const transferTicket = async (bid: Bid): Promise<any> => {
    try {
      const newTicketsArr: string[] = bid.tickets.map(
        (t) => (t as Ticket)._id as string
      );
      const deal: Deal = {
        tickets: newTicketsArr,
        id_seller: bid.id_owner,
        id_buyer: bid.id_bidder,
        id_bid: bid._id as string,
        price: bid.amount,
      };
      const response = await axios.post(config.dealURL.create, deal);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const deleteDeal = async (details: Deal, token: string) => {
    try {
      await axios.post(config.dealURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const updateDeal = async (deal: Deal) => {
    try {
      const response = await axios.patch(
        `${config.dealURL.update}/${deal._id}`,
        deal
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  return {
    getAllDeals,
    getUserDeals,
    getDeal,
    transferTicket,
    deleteDeal,
    updateDeal,
  };
};

export default useDealService;
