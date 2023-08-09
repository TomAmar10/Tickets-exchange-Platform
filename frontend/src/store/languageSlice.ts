import { createSlice } from "@reduxjs/toolkit";
import english from "../languageControl/english.json";
import hebrew from "../languageControl/hebrew.json";
import LangModel from "../languageControl/Language";

export interface LanguageState {
  language: string;
  langData: LangModel;
}

const localStorageLang = localStorage.getItem("hotix-language");
const initLang = localStorageLang ? localStorageLang : "HEBREW";

const initialLanguageState: LanguageState = {
  language: initLang,
  langData:
    initLang === "ENGLISH" ? (english as LangModel) : (hebrew as LangModel),
};

const languageSlice = createSlice({
  name: "language",
  initialState: initialLanguageState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
      localStorage.setItem("hotix-language", action.payload);
      if (action.payload === "HEBREW") state.langData = hebrew as LangModel;
      if (action.payload === "ENGLISH") state.langData = english;
    },
  },
});

export const languageAction = languageSlice.actions;
export default languageSlice.reducer;
