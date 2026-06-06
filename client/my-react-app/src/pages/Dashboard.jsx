import React, { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    getDashboardStats();
  }, []);

  const getDashboardStats = async () => {
    try {
      const response = await API.get("/analytics/dashboard");
      setStats(response.data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    }
  };

  if (!stats) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "30px" }}>
      <h1>Student Management Dashboard</h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "250px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Students</h3>
          <h1>{stats.totalStudents}</h1>
        </div>

        <div
          style={{
            width: "250px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Courses</h3>
          <h1>{stats.totalCourses}</h1>
        </div>

        <div
          style={{
            width: "250px",
            border: "1px solid #ccc",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h3>Total Enrollments</h3>
          <h1>{stats.totalEnrollments}</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;