import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./utils/ChatSlice";

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});
