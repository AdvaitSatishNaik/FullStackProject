import { configureStore } from "@reduxjs/toolkit";

import studentReducer from "./studentSlice";
import courseReducer from "./courseSlice";
import enrollmentReducer from "./enrollmentSlice";
import analyticsReducer from "./analyticsSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    courses: courseReducer,
    enrollments: enrollmentReducer,
    analytics: analyticsReducer,
  },
});

export default store;