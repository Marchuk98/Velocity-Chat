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
      const currentUser = auth.currentUser;

      if (currentUser) {
        state.chatId =
          currentUser.uid > user.uid
            ? `${currentUser.uid}${user.uid}`
            : `${user.uid}${currentUser.uid}`;
      }
      state.user = { ...user };
    },
  },
});

export const { changeUser } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
