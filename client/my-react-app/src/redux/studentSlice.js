import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// GET Students
export const fetchStudents = createAsyncThunk(
  "students/fetchStudents",
  async () => {
    const response = await api.get("/students");
    return response.data;
  }
);

// ADD Student
export const addStudent = createAsyncThunk(
  "students/addStudent",
  async (studentData) => {
    const response = await api.post("/students", studentData);
    return response.data;
  }
);

// DELETE Student
export const deleteStudent = createAsyncThunk(
  "students/deleteStudent",
  async (id) => {
    await api.delete(`/students/${id}`);
    return id;
  }
);

const studentSlice = createSlice({
  name: "students",

  initialState: {
    students: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // Fetch Students
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add Student
      .addCase(addStudent.fulfilled, (state, action) => {
        state.students.push(action.payload);
      })

      // Delete Student
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.students = state.students.filter(
          (student) => student._id !== action.payload
        );
      });
  },
});

export default studentSlice.reducer;