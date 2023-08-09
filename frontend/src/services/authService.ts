import { axiosInstance as axios } from "../utils/config";
import config from "../utils/config";
import { User } from "../models/User";
import { useDispatch } from "react-redux";
import { userActions } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

interface AuthService {
  checkPassportUser: () => Promise<any>;
  login: (userCred: User) => Promise<any>;
  logout: () => Promise<any>;
  register: (user: User) => Promise<any>;
  deleteUser: (details: User, token: string) => Promise<any>;
  updateUser: (user: User) => Promise<any>;
  forgotPassword: (email: string) => Promise<any>;
  resetPassValidity: (id: string, token: string) => Promise<any>;
  resetPassword: (id: string, token: string, password: string) => Promise<any>;
}

const useAuthService = (): AuthService => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkPassportUser = async (): Promise<any> => {
    try {
      const response = await axios.get(config.authURL.getPassportUser, {
        withCredentials: true,
      });
      return response;
    } catch (err: any) {
      return err;
    }
  };

  const login = async (userCred: User): Promise<any> => {
    try {
      const response = await axios.post(config.authURL.login, userCred);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const logout = async (): Promise<any> => {
    try {
      const response = await axios.get(config.authURL.logout);
      dispatch(userActions.logout());
      navigate("/auth");
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const register = async (user: User): Promise<any> => {
    try {
      const response = await axios.post(config.authURL.register, user);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const deleteUser = async (details: User, token: string) => {
    try {
      await axios.post(config.authURL.delete, details, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (err: any) {
      return err.response.data;
    }
  };

  const updateUser = async (user: User) => {
    try {
      const response = await axios.patch(
        `${config.authURL.update}/${user._id}`,
        user
      );
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const response = await axios.post(config.authURL.forgotPassword, {
        email,
      });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const resetPassValidity = async (id: string, token: string) => {
    try {
      const url = config.authURL.resetPassword + `/${id}/${token}`;
      const response = await axios.get(url);
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  const resetPassword = async (id: string, token: string, password: string) => {
    try {
      const url = config.authURL.resetPassword + `/${id}/${token}`;
      const response = await axios.post(url, { password });
      return response;
    } catch (err: any) {
      return err.response.data;
    }
  };

  //   useEffect(() => {}, []);

  return {
    checkPassportUser,
    login,
    logout,
    register,
    deleteUser,
    updateUser,
    forgotPassword,
    resetPassValidity,
    resetPassword,
  };
};

export default useAuthService;
