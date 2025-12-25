import { createSlice } from "@reduxjs/toolkit";
import NepaliDate from "nepali-date-converter";

const initialState = {
  bsDate: new NepaliDate().format("YYYY-MM-DD"),
  adDate: new Date().toISOString().split("T")[0],
  selectedDate: new NepaliDate().format("YYYY-MM-DD"),
};

const dateSlice = createSlice({
  name: "date",
  initialState,
  reducers: {
    setToday: (state) => {
      state.selectedDate = state.bsDate;
    },
    changeDate: (state, action) => {
      // payload will be the new date
      state.selectedDate = action.payload;
    },
  },
});

export const { setToday, changeDate } = dateSlice.actions;
export default dateSlice.reducer;
