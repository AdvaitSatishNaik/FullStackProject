import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// GET Courses
export const fetchCourses = createAsyncThunk(
  "courses/fetchCourses",
  async () => {
    const response = await api.get("/courses");
    return response.data;
  }
);

// ADD Course
export const addCourse = createAsyncThunk(
  "courses/addCourse",
  async (courseData) => {
    const response = await api.post("/courses", courseData);
    return response.data;
  }
);

// DELETE Course
export const deleteCourse = createAsyncThunk(
  "courses/deleteCourse",
  async (id) => {
    await api.delete(`/courses/${id}`);
    return id;
  }
);

const courseSlice = createSlice({
  name: "courses",

  initialState: {
    courses: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload.data;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Course
      .addCase(addCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })

      // Delete Course
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (course) => course._id !== action.payload
        );
      });
  },
});

export default courseSlice.reducer;