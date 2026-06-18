import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface GlobalState {
  chatFilter:
  | any;
  walletAmount: number;
  showFreeSessionBanner: boolean,
  isHideAd: boolean,
  acceptChatRequestPopUp: boolean,
  acceptChatRquestItem: any,
  chatStartTime: any,
}

const initialState: GlobalState = {
  chatFilter: 'All',
  walletAmount: 0,
  showFreeSessionBanner: true,
  isHideAd: false,
  acceptChatRequestPopUp: false,
  acceptChatRquestItem: null,
  chatStartTime: null,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    updateChatFilter: (state, action: PayloadAction<any>) => {
      state.chatFilter = action.payload;
    },
    updateWalletAmount: (state, action: PayloadAction<any>) => {
      state.walletAmount = action.payload;
    },
    updateFreeSessionBanner: (state) => {
      state.showFreeSessionBanner = false;
    },
    updateIsHideAd: (state) => {
      state.isHideAd = true;
    },
    updateAcceptChatRequestPopUp: (state, action: PayloadAction<boolean>) => {
      state.acceptChatRequestPopUp = action.payload;
    },
    updateAcceptChatRequestItem: (state, action: PayloadAction<any>) => {
      state.acceptChatRquestItem = action.payload;
    },
    updateChatStartTime: (state, action: PayloadAction<any>) => {
      state.chatStartTime = action.payload;
    },
  },
});

export const { updateChatFilter, updateWalletAmount, updateFreeSessionBanner, updateIsHideAd, updateAcceptChatRequestPopUp, updateAcceptChatRequestItem, updateChatStartTime } = globalSlice.actions;

export default globalSlice.reducer;
