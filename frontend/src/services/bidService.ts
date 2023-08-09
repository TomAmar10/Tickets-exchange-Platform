import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { Bid, StatusBid } from "../models/Bid";
import { Ticket } from "../models/Ticket";
import { User } from "../models/User";
import { useDispatch, useSelector } from "react-redux";
import { IStore } from "../store/store";
import { userBidsActions } from "../store/userBidsSlice";

interface BidService {
  getAllBids: () => Promise<any>;
  getUserBids: (userId: string) => Promise<any>;
  getBid: (id: string) => Promise<Bid>;
  addBid: (tickets: Ticket[], id_bidder: string, bid: number) => Promise<any>;
  deleteBid: (bidId: string) => Promise<any>;
  updateBid: (bid: Bid) => Promise<any>;
}

const useBidService = (): BidService => {
  const dispatch = useDispatch();
  const user = useSelector((state: IStore) => state.user.user);

  const getAllBids = async (): Promise<any> => {
    try {
      const response = await axios.get(config.bidURL.getAll);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getUserBids = async (userId: string): Promise<any> => {
    try {
      const response = await axios.get(
        `${config.bidURL.getUserBids}/${userId}`
      );
      dispatch(userBidsActions.setBids({ bids: response.data, id: user?._id }));
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getBid = async (id: string): Promise<Bid> => {
    try {
      const response = await axios.get(`${config.bidURL.getSingle}/${id}`);
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addBid = async (
    tickets: Ticket[],
    id_bidder: string,
    bid: number
  ): Promise<any> => {
    try {
      const ticketsIds = tickets.map((t) => t._id as string);
      const id_owner =
        typeof tickets[0].id_owner === "string"
          ? tickets[0].id_owner
          : ((tickets[0].id_owner as User)._id as string);
      const userBid: Bid = {
        tickets: ticketsIds,
        id_bidder,
        id_owner,
        amount: bid,
        status: StatusBid.PENDING,
      };
      const response = await axios.post(config.bidURL.create, userBid);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const deleteBid = async (bidId: string) => {
    try {
      await axios.delete(`${config.bidURL.delete}/${bidId}`);
    } catch (err) {
      console.error(err);
    }
  };

  const updateBid = async (bid: Bid) => {
    try {
      const response = await axios.patch(
        `${config.bidURL.update}/${bid._id}`,
        bid
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  return {
    getAllBids,
    getUserBids,
    getBid,
    addBid,
    deleteBid,
    updateBid,
  };
};

export default useBidService;
