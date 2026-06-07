import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCourses,
  deleteCourse,
} from "../redux/courseSlice";

function Courses() {
  const dispatch = useDispatch();

  const { courses, loading, error } = useSelector(
    (state) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h1 className="page-title">Courses</h1>

      <div className="list-card">
        <h2>Course List</h2>

        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Fees</th>
              <th>Duration</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td>{course.title}</td>
                <td>{course.category}</td>
                <td>₹ {course.fees}</td>
                <td>{course.duration}</td>

                <td>
                  <button
                    className="delete-btn"
                    onClick={() =>
                      dispatch(deleteCourse(course._id))
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Courses;