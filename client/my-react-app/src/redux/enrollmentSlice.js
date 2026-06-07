import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// GET Enrollments
export const fetchEnrollments = createAsyncThunk(
  "enrollments/fetchEnrollments",
  async () => {
    const response = await api.get("/enrollments");
    return response.data;
  }
);

// CREATE Enrollment
export const createEnrollment = createAsyncThunk(
  "enrollments/createEnrollment",
  async (enrollmentData) => {
    const response = await api.post(
      "/enrollments",
      enrollmentData
    );

    return response.data;
  }
);

const enrollmentSlice = createSlice({
  name: "enrollments",

  initialState: {
    enrollments: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Enrollments
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload.data;
      })

      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Create Enrollment
      .addCase(createEnrollment.fulfilled, (state, action) => {
        state.enrollments.push(action.payload);
      });
  },
});

export default enrollmentSlice.reducer;