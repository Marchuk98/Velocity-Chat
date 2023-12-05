import { auth } from "@/services/firebase/firebase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ChatInitialStateType = {
  chatId: null | string;
  user: {
    displayName: string;
    uid: string;
  };
};

const initialState: ChatInitialStateType = {
  chatId: null,
  user: {
    displayName: "",
    uid: "",
  },
};

export const chatSlice = createSlice({
  initialState,
  name: "chat",
  reducers: {
    changeUser: (
      state,
      action: PayloadAction<{ user: ChatInitialStateType["user"] }>,
    ) => {
      const { user } = action.payload;
      const { uid: currentUserId } = auth.currentUser || {};

      if (currentUserId && user.uid) {
        state.chatId = [currentUserId, user.uid].sort().join("_");
        state.user = { ...user };
      }
    },
  },
});

export const { changeUser } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
