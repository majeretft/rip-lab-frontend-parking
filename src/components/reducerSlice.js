import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import AuthService from "../services/auth.service";

const user = JSON.parse(localStorage.getItem("user"));

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password, name, car }, thunkAPI) => {
    try {
      const response = await AuthService.register(username, email, password, name, car);
      thunkAPI.dispatch(setMessage(response.data.message));
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, thunkAPI) => {
    try {
      const data = await AuthService.login(username, password);
      return { user: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await AuthService.logout();
});

const initialState = {
  users: [],
  parkings: [],
  orders: [],
  orderStatuses: [],
  apiBase: "http://127.0.0.1:8080/api",
  isLoggedIn: false,
  user: null,
};

if (user) {
  initialState.isLoggedIn = true;
  initialState.user = user;
}

const slice = createSlice({
  name: "toolkit",
  initialState: initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateParkings: (state, action) => {
      const tmp = state.parkings
        .slice(0, state.parkings.length)
        .filter((x) => +x.id !== action.payload.id);
      tmp.push(action.payload);

      state.parkings = tmp;
    },
    setParkings: (state, action) => {
      state.parkings = action.payload;
    },
    addParking: (state, action) => {
      state.parkings.push(action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    updateOrder: (state, action) => {
      const tmp = state.orders
        .slice(0, state.orders.length)
        .filter((x) => +x.id !== action.payload.id);
      tmp.push(action.payload);

      state.orders = tmp;
    },
    deleteOrder: (state, action) => {
      const tmp = state.orders
        .slice(0, state.orders.length)
        .filter((x) => +x.id !== +action.payload);

      state.orders = tmp;
    },
    setOrderStatuses: (state, action) => {
      state.orderStatuses = action.payload;
    },
    setMessage: (state, action) => {
      return { message: action.payload };
    },
    clearMessage: () => {
      return { message: "" };
    },
  },
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
    },
    [register.rejected]: (state, action) => {
      state.isLoggedIn = false;
    },
    [login.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
    },
    [login.rejected]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
    [logout.fulfilled]: (state, action) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export default slice.reducer;

export const {
  setUsers,
  addUser,
  setParkings,
  addParking,
  setOrders,
  addOrder,
  setOrderStatuses,
  updateOrder,
  deleteOrder,
  setMessage,
  clearMessage,
  updateParkings,
} = slice.actions;
