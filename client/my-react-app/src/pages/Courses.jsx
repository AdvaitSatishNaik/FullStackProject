import { useEffect, useState } from "react";
import API from "../services/api";

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const res = await API.get("/courses");
    setCourses(res.data.data);
  };

  return (
    <div>
      <h1>Courses</h1>

      {courses.map((course) => (
        <div key={course._id}>
          <h3>{course.title}</h3>
          <p>{course.category}</p>
        </div>
      ))}
    </div>
  );
}

export default Courses;