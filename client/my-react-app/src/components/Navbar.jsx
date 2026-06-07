import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>Student Management System</h2>

      <div className="nav-links">
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/enrollments">Enrollments</NavLink>
      </div>
    </nav>
  );
}

export default Navbar;