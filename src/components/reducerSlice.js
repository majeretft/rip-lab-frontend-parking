import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "toolkit",
  initialState: {
    users: [],
    parkings: [],
    orders: [],
    orderStatuses: [],
    apiBase: "http://127.0.0.1:8080/api",
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
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
} = slice.actions;
