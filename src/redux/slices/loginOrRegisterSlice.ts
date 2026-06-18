import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface LoginRegisterState {
	loginWithMobile: boolean;
	userMobile?: string;
	userEmail?: string;
}

const initialState: LoginRegisterState = {
	loginWithMobile: true,
	userMobile: '',
	userEmail: '',
};

export const loginRegisterSlice = createSlice({
  name: 'loginOrRegister',
  initialState,
  reducers: {
    updateLoginType: (state) => {
      state.loginWithMobile = !state.loginWithMobile;
    },
    setUserMobile: (state, action: PayloadAction<string>) => {
      state.userMobile = action.payload;
    },
    setUserEmail: (state, action: PayloadAction<string>) => {
      state.userEmail = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateLoginType, setUserMobile, setUserEmail } = loginRegisterSlice.actions;

export default loginRegisterSlice.reducer;
