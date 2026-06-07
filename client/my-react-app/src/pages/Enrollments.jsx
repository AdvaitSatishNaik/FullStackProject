import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEnrollments } from "../redux/enrollmentSlice";

function Enrollments() {
  const dispatch = useDispatch();

  const { enrollments, loading, error } =
    useSelector(
      (state) => state.enrollments
    );

  useEffect(() => {
    dispatch(fetchEnrollments());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      <h1 className="page-title">
        Enrollments
      </h1>

      <div className="list-card">
        <h2>Enrollment List</h2>

        <table>
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Enrollment Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.map((item) => (
              <tr key={item._id}>
                <td>
                  {item.studentId?.name}
                </td>

                <td>
                  {item.courseId?.title}
                </td>

                <td>
                  {new Date(
                    item.enrollmentDate
                  ).toLocaleDateString()}
                </td>

                <td>
                  <span
                    className={
                      item.status === "Active"
                        ? "status-active"
                        : "status-completed"
                    }
                  >
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Enrollments;