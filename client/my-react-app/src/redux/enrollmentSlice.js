import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
  loading: false,
  error: null,
};

const enrollmentSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {},
});

export default enrollmentSlice.reducer;