import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { Bid } from "../models/Bid";

interface PaymentService {
  completeDeposit: (bid: Bid) => Promise<any>;
  completePayment: (bid: Bid) => Promise<any>;
}

const usePaymentService = (): PaymentService => {
  const completeDeposit = async (bid: Bid): Promise<any> => {
    try {
      const details = { token: "", tickets: bid.tickets };
      const response = await axios.post(config.paymentUrl.deposit, details, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const completePayment = async (bid: Bid): Promise<any> => {
    try {
      const details = { token: "", tickets: bid.tickets };
      const response = await axios.post(config.paymentUrl.pay, details, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  return {
    completeDeposit,
    completePayment,
  };
};

export default usePaymentService;
