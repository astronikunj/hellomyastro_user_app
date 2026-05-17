import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loginRegisterReducer from "../redux/slices/loginOrRegisterSlice";
import { astroService } from "./services/astroService";
import { productService } from "./services/productService";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSliceReducer from '../redux/slices/authSlice';
import globalSliceReducer from '../redux/slices/globalSlice';
import { authService } from "./services/authService";

export const store = configureStore({
  reducer: {
    global: globalSliceReducer,
    loginOrRegister: loginRegisterReducer,
    auth: authSliceReducer,
    [astroService.reducerPath]: astroService.reducer,
    [productService.reducerPath]: productService.reducer,
    [authService.reducerPath]: authService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(astroService.middleware, productService.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
