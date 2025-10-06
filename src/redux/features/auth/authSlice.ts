import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  number?: string;
  imgUrl?: string;
  city?: string;
  colony?: string;
  postOffice?: string;
  subDistrict?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  passwordChangedAt?: string;
  needsPasswordChange?: boolean;
  isDeleted?: boolean;
  __v?: number;
}

type TAuthState = {
  user: IUser | null;
  token: string | null;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (
      state,
      action: PayloadAction<{ user: IUser; token: string | undefined }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token || state.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;

// selectors
export const useCurrentToken = (state: RootState) => state.auth.token;
export const selectCurrentUser = (state: RootState) => state.auth.user;
