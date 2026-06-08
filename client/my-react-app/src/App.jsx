import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import EnrollmentPage from "./pages/EnrollmentPage";
import EditStudent from "./pages/EditStudent";
function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/enrollments" element={<Enrollments />} />
          <Route path="/enrollmentPage" element={<EnrollmentPage />} />
          <Route path="/edit-student/:id" element={<EditStudent />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
