import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from "jwt-decode";
import { User } from "../models/User";
import { IStore } from "./store";

export enum UserModes {
  BUYER = "buyer",
  SELLER = "seller",
}

export interface UserState {
  user: User | null;
  mode: UserModes;
  favorites: string[];
}

const storedFavorites = localStorage.getItem("userFavorites");
const initialFavorites = storedFavorites ? JSON.parse(storedFavorites) : [];

const storedMode: any = localStorage.getItem("userMode");
const initialMode = storedMode || UserModes.BUYER;

const storedToken = localStorage.getItem("token");
const decodedToken: any = storedToken ? jwt_decode(storedToken) : null;
const initialImage: string = localStorage.getItem("userImage") || "";
const initialUser: User | null = decodedToken
  ? { ...decodedToken.user, image: initialImage }
  : null;

const initialUserState: UserState = {
  user: initialUser,
  mode: initialMode,
  favorites: initialFavorites,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    login(state, action) {
      const { authorization, refreshtoken, image } = action.payload;
      const decodedToken: any = jwt_decode(authorization);
      const user: User = decodedToken.user;
      user.token = authorization;
      user.refreshToken = refreshtoken;
      if (image) user.image = image;
      state.user = user;
      state.mode = UserModes.BUYER;
      state.favorites = user.favorites;
      localStorage.setItem("token", authorization);
      localStorage.setItem("refreshToken", refreshtoken);
      localStorage.setItem("userFavorites", JSON.stringify(user.favorites));
      localStorage.setItem("userImage", image);
    },
    logout(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userMode");
      localStorage.removeItem("userFavorites");
      localStorage.removeItem("userImage");
      state.user = null;
    },
    setMode(state, action) {
      state.mode = action.payload;
      localStorage.setItem("userMode", action.payload);
    },
    setNewToken(state, action) {
      const token: string = action.payload;
      localStorage.setItem("token", token);
      state.user = { ...(state.user as User), token };
    },
    toggleFavorite(state, action) {
      const favoriteId = action.payload;
      let favorites = [...(state.favorites || [])];
      if (favorites.includes(favoriteId)) {
        favorites = favorites.filter((e) => e !== favoriteId);
      } else favorites.push(favoriteId);
      state.user = { ...(state.user as User), favorites };
      state.favorites = favorites;
      const favoritesString = JSON.stringify(favorites);
      localStorage.setItem("userFavorites", favoritesString);
    },
  },
});

export const user = (state: IStore) => state.user.user;
export const userMode = (state: IStore) => state.user.mode;

export const userActions = userSlice.actions;
export default userSlice.reducer;
