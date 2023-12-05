import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { chatReducer } from "@/services/slice/chat.slice";
import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: chatReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
