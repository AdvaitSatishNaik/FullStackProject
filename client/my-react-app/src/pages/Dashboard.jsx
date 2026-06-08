import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchStudents } from "../redux/studentSlice";
import { fetchCourses } from "../redux/courseSlice";
import { fetchEnrollments } from "../redux/enrollmentSlice";

import {
  fetchCourseStudentCount,
  fetchRevenueData,
  fetchTopCourses,
} from "../redux/analyticsSlice";

import StudentsPerCourseChart from "../components/charts/StudentsPerCourseChart";
import RevenuePerCourseChart from "../components/charts/RevenuePerCourseChart";
// import TopCoursesChart from "../components/charts/TopCoursesChart";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const students = useSelector(
    (state) => state.students.students
  );

  const courses = useSelector(
    (state) => state.courses.courses
  );

  const enrollments = useSelector(
    (state) => state.enrollments.enrollments
  );

  const {
    courseStudentCount,
    revenueData,
    topCourses,
    totalRevenue,
  } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchCourses());
    dispatch(fetchEnrollments());

    dispatch(fetchCourseStudentCount());
    dispatch(fetchRevenueData());
    dispatch(fetchTopCourses());
  }, [dispatch]);

  return (
    <div>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h1>Dashboard</h1>

        <div
          style={{
            display: "flex",
            gap: "10px",
          }}
        >
          <button
            onClick={() =>
              navigate("/enrollmentPage")
            }
            style={{
              backgroundColor: "#22c55e",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Enroll Student
          </button>

          <button
            onClick={() =>
              navigate("/students")
            }
            style={{
              backgroundColor: "#3b82f6",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
            }}
          >
            Update Student
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="card">
          <h3>Total Students</h3>
          <h1>{students.length}</h1>
        </div>

        <div className="card">
          <h3>Total Courses</h3>
          <h1>{courses.length}</h1>
        </div>

        <div className="card">
          <h3>Total Enrollments</h3>
          <h1>{enrollments.length}</h1>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <h1>₹ {totalRevenue}</h1>
        </div>
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(500px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <StudentsPerCourseChart
          data={courseStudentCount}
        />

        <RevenuePerCourseChart
          data={revenueData}
        />

        {/* <TopCoursesChart
          data={topCourses}
        /> */}
      </div>

      {/* Course Wise Student Count */}
      <div className="section">
        <h2>Course Wise Student Count</h2>

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Total Students</th>
            </tr>
          </thead>

          <tbody>
            {courseStudentCount.map(
              (item, index) => (
                <tr key={index}>
                  <td>{item.courseName}</td>
                  <td>{item.totalStudents}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Revenue Table */}
      <div className="section">
        <h2>Revenue Per Course</h2>

        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Revenue</th>
            </tr>
          </thead>

          <tbody>
            {revenueData.map(
              (item, index) => (
                <tr key={index}>
                  <td>{item.courseName}</td>
                  <td>₹ {item.revenue}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Top Courses Table */}
      <div className="section">
        <h2>Top Courses</h2>

        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Course Name</th>
              <th>Students</th>
            </tr>
          </thead>

          <tbody>
            {topCourses.map(
              (item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.courseName}</td>
                  <td>{item.totalStudents}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;