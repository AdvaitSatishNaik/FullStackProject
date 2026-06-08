import React, { useEffect, useState } from "react";
import axios from "axios";
import "./forms.css";

const EnrollmentPage = () => {
  const [courses, setCourses] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    courseId: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/courses"
      );

      setCourses(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEnroll = async (e) => {
    e.preventDefault();

    try {
      // Step 1 - Create Student
      const studentResponse = await axios.post(
        "http://localhost:5001/students",
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
        }
      );

      const studentId =
        studentResponse.data.data._id;

      // Step 2 - Create Enrollment
      await axios.post(
        "http://localhost:5001/enrollments",
        {
          studentId,
          courseId: formData.courseId,
        }
      );

      alert("Student Enrolled Successfully");

      setFormData({
        name: "",
        email: "",
        mobile: "",
        courseId: "",
      });
    } catch (error) {
      console.log(error);
      alert("Enrollment Failed");
    }
  };

  return (
  <div className="page-container">
    <div className="form-card">
      <h2 className="form-title">
        New Student Enrollment
      </h2>

      <form onSubmit={handleEnroll}>
        <div className="form-group">
          <label className="form-label">
            Student Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mobile Number
          </label>

          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Select Course
          </label>

          <select
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">
              Select Course
            </option>

            {courses?.map((course) => (
              <option
                key={course._id}
                value={course._id}
              >
                {course.title} - ₹{course.fees}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="primary-btn"
        >
          Enroll Student
        </button>
      </form>
    </div>
  </div>
);
};

export default EnrollmentPage;