import { createSlice } from "@reduxjs/toolkit";
import { randomColor } from "./Random";

export const ChatSlice = createSlice({
  name: "chat",
  initialState: {
    member: {
      username: "",
      color: randomColor(),
    },
    messages: [],
    dudes: [],
    authenticated: false,
  },
  reducers: {
    login: (state, { payload }) => {
      state.authenticated = payload;
    },
    setMember: (state, { payload }) => {
      state.member = payload;
    },
    setMessage: (state, { payload }) => {
      state.messages.push(payload);
    },
    intDudes: (state, { payload }) => {
      state.dudes = payload;
    },
    setDude: (state, { payload }) => {
      state.dudes.push(payload);
    },
    removeDude: (state, { payload }) => {
      state.dudes = state.dudes.filter((dude) => dude.id !== payload.id);
    },
  },
});

export const { login, setMember, setMessage, intDudes, setDude, removeDude } =
  ChatSlice.actions;

export default ChatSlice.reducer;
