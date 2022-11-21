import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "toolkit",
  initialState: {
    films: [],
    apiBase: "http://127.0.0.1:8080/api",
  },
  reducers: {
    loadFilms(state, action) {
      state.films = action.payload;
    },
    loadFilm(state, action) {
      state.films.push(action.payload);
    }
  },
});

export default slice.reducer;

export const { loadFilms, loadFilm, setLoading } = slice.actions;
