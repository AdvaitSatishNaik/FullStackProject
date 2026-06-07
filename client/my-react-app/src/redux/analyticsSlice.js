import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// Course Wise Student Count
export const fetchCourseStudentCount = createAsyncThunk(
  "analytics/fetchCourseStudentCount",
  async () => {
    const response = await api.get(
      "/analytics/course-student-count"
    );

    return response.data;
  }
);

// Revenue Per Course
export const fetchRevenueData = createAsyncThunk(
  "analytics/fetchRevenueData",
  async () => {
    const response = await api.get(
      "/analytics/revenue"
    );

    return response.data;
  }
);

// Top 3 Courses
export const fetchTopCourses = createAsyncThunk(
  "analytics/fetchTopCourses",
  async () => {
    const response = await api.get(
      "/analytics/top-courses"
    );

    return response.data;
  }
);

const analyticsSlice = createSlice({
  name: "analytics",

  initialState: {
    courseStudentCount: [],
    revenueData: [],
    topCourses: [],
    totalRevenue: 0,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Course Student Count
      .addCase(fetchCourseStudentCount.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchCourseStudentCount.fulfilled,
        (state, action) => {
          state.loading = false;
          state.courseStudentCount = action.payload;
        }
      )

      .addCase(
        fetchCourseStudentCount.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )

      // Revenue
      .addCase(fetchRevenueData.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchRevenueData.fulfilled,
        (state, action) => {
          state.loading = false;
          state.revenueData = action.payload;

          state.totalRevenue =
            action.payload.reduce(
              (sum, item) => sum + item.revenue,
              0
            );
        }
      )

      .addCase(
        fetchRevenueData.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      )

      // Top Courses
      .addCase(fetchTopCourses.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchTopCourses.fulfilled,
        (state, action) => {
          state.loading = false;
          state.topCourses = action.payload;
        }
      )

      .addCase(
        fetchTopCourses.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        }
      );
  },
});

export default analyticsSlice.reducer;