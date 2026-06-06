import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";

function App() {
  return (
    <BrowserRouter>
      <nav
        style={{
          padding: "20px",
          background: "#222",
          display: "flex",
          gap: "20px",
        }}
      >
        <Link to="/" style={{ color: "white" }}>
          Dashboard
        </Link>

        <Link to="/students" style={{ color: "white" }}>
          Students
        </Link>

        <Link to="/courses" style={{ color: "white" }}>
          Courses
        </Link>

        <Link to="/enrollments" style={{ color: "white" }}>
          Enrollments
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/students" element={<Students />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/enrollments" element={<Enrollments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;