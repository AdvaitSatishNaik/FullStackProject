import { useEffect, useState } from "react";
import API from "../services/api";

function Students() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const res = await API.get("/students");
    setStudents(res.data.data);
  };

  return (
    <div>
      <h1>Students</h1>

      {students.map((student) => (
        <div key={student._id}>
          <h3>{student.name}</h3>
          <p>{student.email}</p>
        </div>
      ))}
    </div>
  );
}

export default Students;