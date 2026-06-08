import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  fetchStudents,
  deleteStudent,
} from "../redux/studentSlice";

function Students() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { students, loading, error } = useSelector(
    (state) => state.students
  );

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h1 className="page-title">Students</h1>

      <div className="list-card">
        <h2>Student List</h2>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.mobile}</td>

                <td>
                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() =>
                        navigate(
                          `/edit-student/${student._id}`
                        )
                      }
                      style={{
                        backgroundColor: "#f59e0b",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        dispatch(
                          deleteStudent(student._id)
                        )
                      }
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Students;