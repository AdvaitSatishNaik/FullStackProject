import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "20px", background: "#222" }}>
      <Link to="/" style={{ color: "#fff", marginRight: "20px" }}>
        Students
      </Link>

      <Link
        to="/courses"
        style={{ color: "#fff", marginRight: "20px" }}
      >
        Courses
      </Link>

      <Link to="/enrollments" style={{ color: "#fff" }}>
        Enrollments
      </Link>
    </nav>
  );
}

export default Navbar;