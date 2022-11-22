import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "toolkit",
  initialState: {
    movies: [],
    seats: [],
    orders: [],
    orderStatuses: [],
    apiBase: "http://127.0.0.1:8080/api",
  },
  reducers: {
    setMovies: (state, action) => {
      state.movies = action.payload;
    },
    addMovie: (state, action) => {
      state.movies.push(action.payload);
    },
    setSeats: (state, action) => {
      state.seats = action.payload;
    },
    addSeat: (state, action) => {
      state.seats.push(action.payload);
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload);
    },
    setOrderStatuses: (state, action) => {
      state.orderStatuses = action.payload;
    },
  },
});

export default slice.reducer;

export const {
  setMovies,
  addMovie,
  setSeats,
  addSeat,
  setOrders,
  addOrder,
  setOrderStatuses,
} = slice.actions;
