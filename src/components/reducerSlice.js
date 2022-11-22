import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "toolkit",
  initialState: {
    movies: [],
    seats: [],
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
  },
});

export default slice.reducer;

export const { setMovies, addMovie, setSeats, addSeat } = slice.actions;
