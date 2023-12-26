import { auth } from "@/services/firebase/firebase";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type ChatInitialStateType = {
  chatId: null | string;
  text: string;
  user: {
    displayName: string;
    photoURL: string;
    uid: string;
  };
};

const initialState: ChatInitialStateType = {
  chatId: null,
  text: "",
  user: {
    displayName: "",
    photoURL: "",
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
    setMessageText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
});

export const { changeUser, setMessageText } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
