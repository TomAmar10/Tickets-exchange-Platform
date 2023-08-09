import axios from "axios";
import store from "../store/store";
import { userActions } from "../store/authSlice";

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async function (err) {
    const state = store.getState();
    const refreshtoken = state.user.user?.refreshToken;
    const originalReq = err?.config;
    if (err?.response?.status === 403 && !originalReq?._retry) {
      originalReq._retry = true;
      const result = await axiosInstance
        .get(config.authURL.refreshToken, {
          headers: {
            authorization: `Bearer ${refreshtoken}`,
          },
        })
        .catch((err) => {
          console.log("error from getting refresh token: ", err);
          return Promise.reject(err);
        });
      const newToken = result.headers.authorization;
      originalReq.headers["authorization"] = `Bearer ${newToken}`;
      store.dispatch(userActions.setNewToken(newToken));
      return axiosInstance(originalReq);
    }
    return Promise.reject(err);
  }
);

const config = {
  userURL: {
    getAll: "/users/all",
    getSingle: "/users/single",
    addRating: "/users/single/add-rating",
    addFavorite: "/users/single/add-favorite-event",
    removeFavorite: "/users/single/remove-favorite-event"
  },
  authURL: {
    login: "/auth/single/login",
    logout: "/auth/single/logout",
    google: "/auth/google",
    facebook: "/auth/facebook",
    getPassportUser: "/auth/passport/get-user",
    register: "/auth/single/register",
    update: "/auth/single/update",
    delete: "/auth/single/delete",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    refreshToken: "/auth/refresh-token",
  },
  eventURL: {
    getAll: "/events/all",
    getSingle: "/events/single",
    create: "/events/single/add",
    update: "/events/single/update",
    delete: "/events/single/delete",
  },
  ticketURL: {
    getAll: "/tickets/all",
    getSingle: "/tickets/single",
    getForSaleByEvent: "/tickets/all/by-event",
    getForSaleByUserEvent: "/tickets/all/by-event",
    getUserTickets: "/tickets/all/by-user",
    create: "/tickets/single/add",
    createFew: "/tickets/few/add",
    update: "/tickets/single/update",
    delete: "/tickets/single/delete",
  },
  dealURL: {
    getAll: "/deals/all",
    getSingle: "/deals/single",
    create: "/deals/single/add",
    update: "/deals/single/update",
    delete: "/deals/single/delete",
  },
  categoryURL: {
    getAll: "/categories/all",
    getSingle: "/categories/single",
    create: "/categories/single/add",
    update: "/categories/single/update",
    delete: "/categories/single/delete",
  },
  bidURL: {
    getAll: "/bids/all",
    getUserBids: "/bids/all/by_user",
    getSingle: "/bids/single",
    create: "/bids/single/add",
    update: "/bids/single/update",
    delete: "/bids/single/delete",
  },
  subscribeUrl: {
    getAll: "/subscribes/all",
    getSingle: "/subscribes/single",
    create: "/subscribes/single/add",
  },
  paymentUrl: {
    deposit: "/payments/create-checkout-session", //need to be changed
    pay: "/payments/create-checkout-session",
  },
  options: {
    headers: { "content-type": "application/json" },
  },
};

export const appRoutes = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    result: "/auth/result",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password/:id/:token",
  },
  chooseMode: "/choose-mode",
};

export default config;
