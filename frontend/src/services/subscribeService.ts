import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";

interface SubscribeService {
  getAllSubscribes: () => Promise<any>;
  getSubscribe: (id: string) => Promise<any>;
  addSubscribe: (email: string) => Promise<any>;
}

const useSubscribeService = (): SubscribeService => {
  const getAllSubscribes = async (): Promise<any> => {
    try {
      const response = await axios.get(config.subscribeUrl.getAll);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const getSubscribe = async (id: string): Promise<any> => {
    try {
      const response = await axios.get(
        `${config.subscribeUrl.getSingle}/${id}`
      );
      return response.data;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const addSubscribe = async (email: string): Promise<any> => {
    try {
      const response = await axios.post(config.subscribeUrl.create, { email });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  return {
    getAllSubscribes,
    getSubscribe,
    addSubscribe,
  };
};

export default useSubscribeService;
