import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchStudents } from "../redux/studentSlice";
import { fetchCourses } from "../redux/courseSlice";
import { fetchEnrollments } from "../redux/enrollmentSlice";

import {
  fetchCourseStudentCount,
  fetchRevenueData,
  fetchTopCourses,
} from "../redux/analyticsSlice";

function Dashboard() {
  const dispatch = useDispatch();

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
      <h1>Dashboard</h1>

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
            {courseStudentCount.map((item, index) => (
              <tr key={index}>
                <td>{item.courseName}</td>
                <td>{item.totalStudents}</td>
              </tr>
            ))}
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
            {revenueData.map((item, index) => (
              <tr key={index}>
                <td>{item.courseName}</td>
                <td>₹ {item.revenue}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Top Courses */}

      <div className="section">
        <h2>Top 3 Courses</h2>

        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Course Name</th>
              <th>Students</th>
            </tr>
          </thead>

          <tbody>
            {topCourses.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.courseName}</td>
                <td>{item.totalStudents}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;