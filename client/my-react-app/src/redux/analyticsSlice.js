import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseStudentCount: [],
  revenueData: [],
  topCourses: [],
  totalRevenue: 0,
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
});

export default analyticsSlice.reducer;