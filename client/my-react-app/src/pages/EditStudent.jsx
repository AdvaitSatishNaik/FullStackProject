import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./forms.css";

function EditStudent() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
  });

  useEffect(() => {
    getStudent();
  }, []);

  const getStudent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/students/${id}`
      );

      setFormData(response.data.data);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5001/students/${id}`,
        formData
      );

      alert("Student Updated Successfully");

      navigate("/students");
    } catch (error) {
      console.log(error);
      alert("Update Failed");
    }
  };

 return (
  <div className="page-container">
    <div className="form-card">
      <h2 className="form-title">
        Edit Student
      </h2>

      <form onSubmit={handleUpdate}>
        <div className="form-group">
          <label className="form-label">
            Name
          </label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Email
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">
            Mobile
          </label>

          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <button
          type="submit"
          className="primary-btn"
        >
          Update Student
        </button>
      </form>
    </div>
  </div>
);
}

export default EditStudent;