import { useEffect, useState } from "react";
import API from "../services/api";

function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    const res = await API.get("/enrollments");
    setEnrollments(res.data.data);
  };

  return (
    <div>
      <h1>Enrollments</h1>

      {enrollments.map((enrollment) => (
        <div key={enrollment._id}>
          <p>{enrollment.studentId?.name}</p>
          <p>{enrollment.courseId?.title}</p>
        </div>
      ))}
    </div>
  );
}

export default Enrollments;